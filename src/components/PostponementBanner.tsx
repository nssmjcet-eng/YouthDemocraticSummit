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

/**
 * Registration closed notice — shown on the /register page when registration is not open.
 */
export function RegistrationClosedNotice({ freshStatus }: { freshStatus: string }) {
  return (
    <div className="registration-closed-notice" role="status" aria-live="polite">
      <div className="registration-closed-icon">
        <AlertTriangle size={32} className="text-gold" aria-hidden="true" />
      </div>
      <h2 className="registration-closed-title">Registrations Are Currently Closed</h2>
      {freshStatus === 'NOT_OPEN' ? (
        <p className="registration-closed-message">
          Fresh registrations will open once the revised event details are confirmed. Please check the official website for updates.
        </p>
      ) : (
        <p className="registration-closed-message">
          The registration period is currently closed. Please check the official website for future announcements.
        </p>
      )}
      <p className="registration-closed-sub">
        YDS 2026 has been postponed. All updates will be published on this website.
      </p>
    </div>
  );
}
