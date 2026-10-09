import { useState } from 'react';
import { AlertTriangle, X, ChevronDown, ChevronUp } from 'lucide-react';

export interface PublicAnnouncementData {
  eventStatus: string;
  freshRegistrationStatus: string;
  registrationDeadlineOverride: string | null;
  revisedDates: string | null;
  revisedVenue: string | null;
  isVisible: boolean;
  announcement: {
    title: string;
    bannerMessage: string;
    fullBody: string;
    reason: string;
    publishedAt: string | null;
  } | null;
}

interface PostponementBannerProps {
  data: PublicAnnouncementData;
}

export function PostponementBanner({ data }: PostponementBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!data.isVisible || !data.announcement || dismissed) return null;

  const { announcement, eventStatus, freshRegistrationStatus, revisedDates, revisedVenue } = data;
  const isPostponed = eventStatus === 'POSTPONED' || eventStatus === 'REGISTRATION_CLOSED' || eventStatus === 'CANCELLED';

  return (
    <div className={`postponement-banner ${isPostponed ? 'postponement-banner--postponed' : 'postponement-banner--info'}`} role="alert" aria-live="polite">
      <div className="postponement-banner-inner section-inner">
        {/* Icon + heading row */}
        <div className="postponement-banner-header">
          <div className="postponement-banner-icon-title">
            <AlertTriangle className="postponement-banner-icon" aria-hidden="true" size={20} />
            <div>
              <p className="postponement-banner-label">OFFICIAL NOTICE</p>
              <h2 className="postponement-banner-title">{announcement.title}</h2>
            </div>
          </div>
          <div className="postponement-banner-actions">
            <button
              type="button"
              className="postponement-banner-toggle"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls="postponement-full-notice"
            >
              {expanded ? <><ChevronUp size={15} /> Hide Full Notice</> : <><ChevronDown size={15} /> Read Full Notice</>}
            </button>
            <button
              type="button"
              className="postponement-banner-dismiss"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss announcement banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Short banner message */}
        <p className="postponement-banner-message">{announcement.bannerMessage}</p>

        {/* Status pills */}
        <div className="postponement-banner-pills">
          <span className={`postponement-pill postponement-pill--status-${eventStatus.toLowerCase().replace('_', '-')}`}>
            {eventStatus.replace(/_/g, ' ')}
          </span>
          {freshRegistrationStatus !== 'OPEN' && (
            <span className="postponement-pill postponement-pill--reg-closed">
              Registration: {freshRegistrationStatus === 'NOT_OPEN' ? 'NOT YET OPEN' : 'CLOSED'}
            </span>
          )}
          {freshRegistrationStatus === 'OPEN' && (
            <span className="postponement-pill postponement-pill--reg-open">Registration: OPEN</span>
          )}
        </div>

        {/* Expanded full notice */}
        {expanded && (
          <div id="postponement-full-notice" className="postponement-full-notice">
            <div className="postponement-full-notice-body">
              {announcement.fullBody.split('\n').map((line, i) =>
                line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
              )}
            </div>

            {/* Additional details if revised info is available */}
            {(revisedDates || revisedVenue) && (
              <div className="postponement-revised-details">
                {revisedDates && (
                  <div className="postponement-revised-item">
                    <span className="postponement-revised-label">REVISED DATES</span>
                    <span className="postponement-revised-value">{revisedDates}</span>
                  </div>
                )}
                {revisedVenue && (
                  <div className="postponement-revised-item">
                    <span className="postponement-revised-label">REVISED VENUE</span>
                    <span className="postponement-revised-value">{revisedVenue}</span>
                  </div>
                )}
              </div>
            )}

            {freshRegistrationStatus === 'NOT_OPEN' && (
              <div className="postponement-reg-notice">
                <strong>Fresh registrations will open once the revised event details are confirmed.</strong> Please check this website for updates.
              </div>
            )}
            {freshRegistrationStatus === 'OPEN' && data.registrationDeadlineOverride && (
              <div className="postponement-reg-notice postponement-reg-notice--open">
                <strong>Fresh registrations are now open.</strong> Registration deadline: <strong>{new Date(data.registrationDeadlineOverride).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Fallback shown when the announcement endpoint fails entirely.
 * Safe: never shows old dates or falsely claims registration is open.
 */
export function AnnouncementLoadError() {
  return (
    <div className="postponement-banner postponement-banner--error" role="alert">
      <div className="postponement-banner-inner section-inner">
        <p className="postponement-banner-message">
          ⚠️ The event update could not be loaded at this time. Please refresh the page or check back later. Do not rely on any previously displayed dates.
        </p>
      </div>
    </div>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

/**
 * Registration Notice Modal — triggered when a visitor clicks "Register Now" or "Register Team"
 * while registrations are stopped / closed from the admin panel.
 */
export function RegistrationNoticeModal({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: PublicAnnouncementData | null;
}) {
  const announcement = data?.announcement;
  const title = announcement?.title || 'YDS 2026 Has Been Postponed';
  const bannerMessage =
    announcement?.bannerMessage ||
    'The Youth Democratic Summit 2026 has been postponed due to venue-related issues. Fresh registrations will be invited once revised details are confirmed.';
  const fullBody = announcement?.fullBody || '';
  const revisedDates = data?.revisedDates;
  const revisedVenue = data?.revisedVenue;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-gold/40 text-foreground p-6 sm:p-8">
        <DialogHeader className="text-left space-y-2 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase tracking-wider">
              <AlertTriangle size={12} />
              Registration Paused
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold">OFFICIAL NOTICE</span>
          </div>
          <DialogTitle className="font-serif text-2xl sm:text-3xl text-foreground font-normal leading-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Youth Democratic Summit 2026 · Organised by NSS MJCET
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm leading-relaxed text-muted-foreground">
          {bannerMessage && (
            <div className="p-3.5 rounded bg-muted/60 border border-border text-foreground font-medium text-sm">
              {bannerMessage}
            </div>
          )}

          {fullBody ? (
            <div className="space-y-3 font-normal text-foreground/90 leading-relaxed text-[13.5px]">
              {fullBody.split('\n').map((line, idx) =>
                line.trim() === '' ? <div key={idx} className="h-2" /> : <p key={idx}>{line}</p>
              )}
            </div>
          ) : (
            <p>Fresh registrations will open once revised event details are confirmed. Please check the official website for updates.</p>
          )}

          {(revisedDates || revisedVenue) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded bg-muted/40 border border-gold/30">
              {revisedDates && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-gold uppercase flex items-center gap-1">
                    <Calendar size={12} /> Revised Dates
                  </span>
                  <p className="text-sm font-semibold text-foreground">{revisedDates}</p>
                </div>
              )}
              {revisedVenue && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider text-gold uppercase flex items-center gap-1">
                    <MapPin size={12} /> Revised Venue
                  </span>
                  <p className="text-sm font-semibold text-foreground">{revisedVenue}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border/60 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Thank you for your patience and understanding.
          </p>
          <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close Notice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Registration closed notice — shown on the /register page when registration is not open.
 */
export function RegistrationClosedNotice({
  freshStatus,
  announcement,
  revisedDates,
  revisedVenue,
}: {
  freshStatus: string;
  announcement?: PublicAnnouncementData['announcement'] | null;
  revisedDates?: string | null;
  revisedVenue?: string | null;
}) {
  return (
    <div className="registration-closed-notice space-y-4" role="status" aria-live="polite">
      <div className="registration-closed-icon">
        <AlertTriangle size={32} className="text-gold" aria-hidden="true" />
      </div>

      <div className="text-center space-y-1">
        <span className="text-xs font-bold tracking-wider uppercase text-gold">OFFICIAL NOTICE</span>
        <h2 className="registration-closed-title">
          {announcement?.title || 'Registrations Are Currently Paused'}
        </h2>
      </div>

      {announcement?.bannerMessage && (
        <div className="p-3.5 rounded bg-muted/60 border border-border text-foreground font-medium text-sm max-w-xl text-left">
          {announcement.bannerMessage}
        </div>
      )}

      {announcement?.fullBody ? (
        <div className="text-left text-sm text-muted-foreground space-y-2.5 max-w-xl leading-relaxed">
          {announcement.fullBody.split('\n').map((line, i) =>
            line.trim() === '' ? <div key={i} className="h-1.5" /> : <p key={i}>{line}</p>
          )}
        </div>
      ) : freshStatus === 'NOT_OPEN' ? (
        <p className="registration-closed-message">
          Fresh registrations will open once the revised event details are confirmed. Please check the official website for updates.
        </p>
      ) : (
        <p className="registration-closed-message">
          The registration period is currently closed. Please check the official website for future announcements.
        </p>
      )}

      {(revisedDates || revisedVenue) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded bg-muted/40 border border-gold/30 max-w-xl w-full text-left">
          {revisedDates && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-gold uppercase flex items-center gap-1">
                <Calendar size={12} /> Revised Dates
              </span>
              <p className="text-sm font-semibold text-foreground">{revisedDates}</p>
            </div>
          )}
          {revisedVenue && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-wider text-gold uppercase flex items-center gap-1">
                <MapPin size={12} /> Revised Venue
              </span>
              <p className="text-sm font-semibold text-foreground">{revisedVenue}</p>
            </div>
          )}
        </div>
      )}

      <p className="registration-closed-sub text-xs text-muted-foreground/80">
        YDS 2026 has been postponed. All updates are published on this official website.
      </p>
    </div>
  );
}

