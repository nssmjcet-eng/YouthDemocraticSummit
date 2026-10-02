import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useState, useMemo, Fragment } from 'react';
import {
  Check,
  LogOut,
  X,
  Mail,
  Search,
  Eye,
  Globe,
  Plus,
  Trash2,
  Lock,
  Unlock,
  AlertTriangle,
  Users,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Clock,
  UserPlus,
  Shield,
  Upload,
  CheckCircle2,
  Flag,
  Database,
  Download,
  Code,
  Edit,
  Printer,
  FileText,
  ChevronDown,
  Filter,
  Calendar,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageInput } from '@/components/ImageInput';
import { firebaseAuth } from '@/integrations/firebase/client';
import { signOut as fbSignOut } from 'firebase/auth';
import { YDS_CONFIG } from '@/config/yds';
import { parseMongoRegistration } from '@/lib/yds-storage';
import { uploadImage } from '@/functions/public';
import {
  adminGetApplications,
  adminGetApplication,
  adminUpdateApplicationStatus,
  adminGetParties,
  adminUpsertParty,
  adminDeleteParty,
  adminAllocateParty,
  adminGetSponsors,
  adminUpsertSponsor,
  adminDeleteSponsor,
  adminGetResultsStatus,
  adminSetResultsStatus,
  adminGetAdminUsers,
  adminAddAdminUser,
  adminRemoveAdminUser,
  adminGetStats,
  adminGetAuditLogs,
  adminGetOrganisers,
  adminUpsertOrganiser,
  adminDeleteOrganiser,
  adminGetCoOrganisers,
  adminUpsertCoOrganiser,
  adminDeleteCoOrganiser,
  adminGetDevelopers,
  adminUpsertDeveloper,
  adminGetDbStats,
  adminExportData,
  adminGetCompendium,
  adminExportCompendium,
  adminClearApplications,
} from '@/functions/admin';
import type { TeamApplicationPayload } from '@/types/yds';

export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({
    meta: [
      { title: 'Admin Panel — Youth Democratic Summit 2026' },
      { name: 'description', content: 'YDS 2026 application review, party allocation, and results portal.' },
    ],
  }),
  component: AdminPanel,
});

type AdminNavTab =
  | 'overview'
  | 'applications'
  | 'party-allocation'
  | 'parties-config'
  | 'results'
  | 'compendium'
  | 'sponsors'
  | 'organisers'
  | 'co-organisers'
  | 'developers'
  | 'storage'
  | 'admins'
  | 'audit';

type AppFilterStatus = 'ALL' | 'PENDING' | 'ACCEPTED' | 'WAITLISTED' | 'DECLINED';

type RegistrationRow = {
  id: string;
  parsed: TeamApplicationPayload;
};

function getIdToken(): Promise<string | null> {
  const user = firebaseAuth.currentUser;
  if (!user) return Promise.resolve(null);
  return user.getIdToken();
}

function AdminPanel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const routeCtx = Route.useRouteContext();

  const [activeTab, setActiveTab] = useState<AdminNavTab>('overview');
  const [appFilter, setAppFilter] = useState<AppFilterStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [appPage, setAppPage] = useState(1);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedAppNotes, setSelectedAppNotes] = useState('');

  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  const [showReleaseModal, setShowReleaseModal] = useState(false);

  const [showAddSponsorModal, setShowAddSponsorModal] = useState(false);
  const [editSponsorId, setEditSponsorId] = useState<string | null>(null);
  const [sponsorForm, setSponsorForm] = useState({ name: '', category: 'Title Sponsor', websiteUrl: '', description: '', displayOrder: 99, isActive: true });
  const [sponsorLogoBase64, setSponsorLogoBase64] = useState<string | null>(null);
  const [sponsorLogoName, setSponsorLogoName] = useState('');
  const [sponsorLogoType, setSponsorLogoType] = useState('');

  const [showAddPartyModal, setShowAddPartyModal] = useState(false);
  const [editPartyId, setEditPartyId] = useState<string | null>(null);
  const [partyForm, setPartyForm] = useState({
    name: '',
    abbreviation: '',
    ideology: '',
    historyDescription: '',
    sortOrder: 99,
    classification: 'INDEPENDENT',
    formationDate: '',
  });
  const [partyLogoBase64, setPartyLogoBase64] = useState<string | null>(null);
  const [partyLogoName, setPartyLogoName] = useState('');
  const [partyLogoType, setPartyLogoType] = useState('');

  // ── Organisers state ──────────────────────────────────────────────────────
  const [showAddOrganiserModal, setShowAddOrganiserModal] = useState(false);
  const [editOrganiserId, setEditOrganiserId] = useState<string | null>(null);
  const [organiserForm, setOrganiserForm] = useState({ name: '', designation: '', displayOrder: 1, isActive: true, linkedinUrl: '' });
  const [organiserPhotoBase64, setOrganiserPhotoBase64] = useState<string | null>(null);
  const [organiserPhotoName, setOrganiserPhotoName] = useState('');
  const [organiserPhotoType, setOrganiserPhotoType] = useState('');

  // ── Co-Organisers state ───────────────────────────────────────────────────
  const [showAddCoOrganiserModal, setShowAddCoOrganiserModal] = useState(false);
  const [editCoOrganiserId, setEditCoOrganiserId] = useState<string | null>(null);
  const [coOrganiserForm, setCoOrganiserForm] = useState({ name: '', designation: '', displayOrder: 1, isActive: true, linkedinUrl: '' });
  const [coOrganiserPhotoBase64, setCoOrganiserPhotoBase64] = useState<string | null>(null);
  const [coOrganiserPhotoName, setCoOrganiserPhotoName] = useState('');
  const [coOrganiserPhotoType, setCoOrganiserPhotoType] = useState('');

  // ── Developers state ──────────────────────────────────────────────────────
  const [showEditDevModal, setShowEditDevModal] = useState(false);
  const [devForm, setDevForm] = useState({ id: '', name: '', githubUrl: '', linkedinUrl: '' });

  // ── Export state ──────────────────────────────────────────────────────────
  const [isExporting, setIsExporting] = useState(false);

  // ── Compendium state ──────────────────────────────────────────────────────
  const [compendiumStatusFilter, setCompendiumStatusFilter] = useState('ALL');
  const [compendiumSearch, setCompendiumSearch] = useState('');
  const [compendiumPage, setCompendiumPage] = useState(1);
  const [compendiumSortBy, setCompendiumSortBy] = useState<'submittedAt' | 'teamName' | 'leaderName' | 'college' | 'status'>('submittedAt');
  const [compendiumSortOrder, setCompendiumSortOrder] = useState<1 | -1>(-1);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportIncludeParty, setExportIncludeParty] = useState(false);
  const [isExportingCompendium, setIsExportingCompendium] = useState(false);
  const [isClearingApps, setIsClearingApps] = useState(false);

  const adminUserEmail: string = (routeCtx as any)?.user?.email ?? firebaseAuth.currentUser?.email ?? '';
  const isSuperAdmin: boolean = (routeCtx as any)?.isSuperAdmin ?? false;
  const idTokenFromCtx: string = (routeCtx as any)?.idToken ?? '';

  // ── Stats ─────────────────────────────────────────────────────────────────
  const statsQuery = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetStats({ data: { idToken: tok } });
    },
    refetchInterval: 30_000,
  });

  // ── Applications (Server-side paginated & filtered) ──────────────────────
  const registrationsQuery = useQuery({
    queryKey: ['admin-registrations', appFilter, searchQuery, appPage],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      const res = await adminGetApplications({
        data: {
          idToken: tok,
          statusFilter: appFilter,
          searchQuery: searchQuery,
          page: appPage,
          pageSize: 20,
        },
      });
      if (Array.isArray(res)) {
        return {
          applications: res.map((d: any) => ({
            id: d.id,
            parsed: parseMongoRegistration(d.id, d),
          })),
          totalCount: res.length,
          page: 1,
          pageSize: res.length,
          totalPages: 1,
        };
      }
      return {
        applications: ((res as any).applications || []).map((d: any) => ({
          id: d.id,
          parsed: parseMongoRegistration(d.id, d),
        })),
        totalCount: (res as any).totalCount || 0,
        page: (res as any).page || 1,
        pageSize: (res as any).pageSize || 20,
        totalPages: (res as any).totalPages || 1,
      };
    },
  });

  // ── Accepted Applications (for Party Allocation across all pages) ─────────
  const acceptedAppsQuery = useQuery({
    queryKey: ['admin-accepted-apps'],
    queryFn: async (): Promise<RegistrationRow[]> => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      const res = await adminGetApplications({ data: { idToken: tok, statusFilter: 'ACCEPTED' } });
      const docs = Array.isArray(res) ? res : (res as any).applications || [];
      return docs.map((d: any) => ({
        id: d.id,
        parsed: parseMongoRegistration(d.id, d),
      }));
    },
  });

  // ── Application Detail (when viewing full application) ────────────────────
  const applicationDetailQuery = useQuery({
    queryKey: ['admin-app-detail', selectedAppId],
    enabled: Boolean(selectedAppId),
    queryFn: async () => {
      if (!selectedAppId) return null;
      const tok = idTokenFromCtx || await getIdToken() || '';
      const doc = await adminGetApplication({ data: { idToken: tok, id: selectedAppId } });
      return {
        id: doc.id,
        parsed: parseMongoRegistration(doc.id, doc),
      };
    },
  });

  // ── Parties ───────────────────────────────────────────────────────────────
  const partiesQuery = useQuery({
    queryKey: ['admin-parties'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetParties({ data: { idToken: tok } });
    },
  });

  // ── Sponsors ──────────────────────────────────────────────────────────────
  const sponsorsQuery = useQuery({
    queryKey: ['admin-sponsors'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetSponsors({ data: { idToken: tok } });
    },
  });

  // ── Results Status ────────────────────────────────────────────────────────
  const resultsStatusQuery = useQuery({
    queryKey: ['admin-results-status'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetResultsStatus({ data: { idToken: tok } });
    },
  });

  // ── Admin Users ───────────────────────────────────────────────────────────
  const adminUsersQuery = useQuery({
    queryKey: ['admin-users'],
    enabled: isSuperAdmin,
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetAdminUsers({ data: { idToken: tok } });
    },
  });

  // ── Audit Logs (Super Admin only) ─────────────────────────────────────────
  const auditLogsQuery = useQuery({
    queryKey: ['admin-audit-logs'],
    enabled: isSuperAdmin && activeTab === 'audit',
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetAuditLogs({ data: { idToken: tok, limit: 500 } });
    },
  });

  // ── Organisers ────────────────────────────────────────────────────────────
  const organisersQuery = useQuery({
    queryKey: ['admin-organisers'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetOrganisers({ data: { idToken: tok } });
    },
  });

  // ── Co-Organisers ─────────────────────────────────────────────────────────
  const coOrganisersQuery = useQuery({
    queryKey: ['admin-co-organisers'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetCoOrganisers({ data: { idToken: tok } });
    },
  });

  // ── Developers ────────────────────────────────────────────────────────────
  const developersQuery = useQuery({
    queryKey: ['admin-developers'],
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetDevelopers({ data: { idToken: tok } });
    },
  });

  // ── DB Stats & Storage ────────────────────────────────────────────────────
  const dbStatsQuery = useQuery({
    queryKey: ['admin-db-stats'],
    enabled: activeTab === 'storage',
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetDbStats({ data: { idToken: tok } });
    },
  });

  // ── Master Compendium ─────────────────────────────────────────────────────
  const compendiumQuery = useQuery({
    queryKey: ['admin-compendium', compendiumStatusFilter, compendiumSearch, compendiumPage, compendiumSortBy, compendiumSortOrder],
    enabled: activeTab === 'compendium',
    queryFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      return adminGetCompendium({ data: { idToken: tok, statusFilter: compendiumStatusFilter, searchQuery: compendiumSearch, page: compendiumPage, pageSize: 50, sortBy: compendiumSortBy, sortOrder: compendiumSortOrder } });
    },
  });

  // ── Mutation: Update Status ───────────────────────────────────────────────
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      rowId,
      newStatus,
      adminNotes,
    }: {
      rowId: string;
      newStatus: 'ACCEPTED' | 'WAITLISTED' | 'DECLINED' | 'PENDING';
      adminNotes?: string;
    }) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminUpdateApplicationStatus({ data: { idToken: tok, id: rowId, status: newStatus as any, adminNotes: adminNotes ?? '' } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-accepted-apps'] });
      queryClient.invalidateQueries({ queryKey: ['admin-app-detail'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });

  // ── Mutation: Allocate Party ──────────────────────────────────────────────
  const allocatePartyMutation = useMutation({
    mutationFn: async ({ applicationId, partyId }: { applicationId: string; partyId: string }) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminAllocateParty({ data: { idToken: tok, applicationId, partyId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-accepted-apps'] });
      queryClient.invalidateQueries({ queryKey: ['admin-app-detail'] });
      queryClient.invalidateQueries({ queryKey: ['admin-parties'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
    },
  });

  // ── Mutation: Toggle Results Release ─────────────────────────────────────
  const toggleResultsMutation = useMutation({
    mutationFn: async (released: boolean) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminSetResultsStatus({ data: { idToken: tok, released } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-results-status'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
      setShowReleaseModal(false);
    },
  });

  // ── Mutation: Upsert Sponsor ──────────────────────────────────────────────
  const upsertSponsorMutation = useMutation({
    mutationFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      let logoId: string | undefined = undefined;
      if (sponsorLogoBase64) {
        const uploadResult = await uploadImage({ data: { idToken: tok, filename: sponsorLogoName, contentType: sponsorLogoType, base64: sponsorLogoBase64 } });
        logoId = uploadResult.id;
      }
      const sponsorData: any = { idToken: tok, ...sponsorForm };
      if (editSponsorId) sponsorData.id = editSponsorId;
      if (logoId) sponsorData.logoId = logoId;
      await adminUpsertSponsor({ data: sponsorData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sponsors'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
      setShowAddSponsorModal(false);
      setSponsorLogoBase64(null);
      setEditSponsorId(null);
      setSponsorForm({ name: '', category: 'Title Sponsor', websiteUrl: '', description: '', displayOrder: 99, isActive: true });
    },
  });

  // ── Mutation: Delete Sponsor ──────────────────────────────────────────────
  const deleteSponsorMutation = useMutation({
    mutationFn: async (id: string) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminDeleteSponsor({ data: { idToken: tok, id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sponsors'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
    },
  });

  // ── Mutation: Upsert Party ────────────────────────────────────────────────
  const upsertPartyMutation = useMutation({
    mutationFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      let logoId: string | undefined = undefined;
      if (partyLogoBase64) {
        const uploadResult = await uploadImage({ data: { idToken: tok, filename: partyLogoName, contentType: partyLogoType, base64: partyLogoBase64 } });
        logoId = uploadResult.id;
      }
      const partyData: any = { idToken: tok, ...partyForm };
      if (editPartyId) partyData.id = editPartyId;
      if (logoId) partyData.logoId = logoId;
      await adminUpsertParty({ data: partyData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-parties'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
      setShowAddPartyModal(false);
      setPartyLogoBase64(null);
      setEditPartyId(null);
      setPartyForm({ name: '', abbreviation: '', ideology: '', historyDescription: '', sortOrder: 99, classification: 'INDEPENDENT', formationDate: '' });
    },
  });

  // ── Mutation: Delete Party ────────────────────────────────────────────────
  const deletePartyMutation = useMutation({
    mutationFn: async (id: string) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminDeleteParty({ data: { idToken: tok, id } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-parties'] }),
  });

  // ── Mutation: Upsert Organiser ────────────────────────────────────────────
  const upsertOrganiserMutation = useMutation({
    mutationFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      let photoId: string | undefined = undefined;
      if (organiserPhotoBase64) {
        const uploadResult = await uploadImage({
          data: { idToken: tok, filename: organiserPhotoName, contentType: organiserPhotoType, base64: organiserPhotoBase64 },
        });
        photoId = uploadResult.id;
      }
      const payload: any = { idToken: tok, ...organiserForm };
      if (editOrganiserId) payload.id = editOrganiserId;
      if (photoId) payload.photoId = photoId;
      await adminUpsertOrganiser({ data: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-organisers'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
      setShowAddOrganiserModal(false);
      setOrganiserPhotoBase64(null);
      setEditOrganiserId(null);
      setOrganiserForm({ name: '', designation: '', displayOrder: 1, isActive: true, linkedinUrl: '' });
    },
  });

  const deleteOrganiserMutation = useMutation({
    mutationFn: async (id: string) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminDeleteOrganiser({ data: { idToken: tok, id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-organisers'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
    },
  });

  // ── Mutation: Upsert Co-Organiser ─────────────────────────────────────────
  const upsertCoOrganiserMutation = useMutation({
    mutationFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      let photoId: string | undefined = undefined;
      if (coOrganiserPhotoBase64) {
        const uploadResult = await uploadImage({
          data: { idToken: tok, filename: coOrganiserPhotoName, contentType: coOrganiserPhotoType, base64: coOrganiserPhotoBase64 },
        });
        photoId = uploadResult.id;
      }
      const payload: any = { idToken: tok, ...coOrganiserForm };
      if (editCoOrganiserId) payload.id = editCoOrganiserId;
      if (photoId) payload.photoId = photoId;
      await adminUpsertCoOrganiser({ data: payload });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-co-organisers'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
      setShowAddCoOrganiserModal(false);
      setCoOrganiserPhotoBase64(null);
      setEditCoOrganiserId(null);
      setCoOrganiserForm({ name: '', designation: '', displayOrder: 1, isActive: true, linkedinUrl: '' });
    },
  });

  const deleteCoOrganiserMutation = useMutation({
    mutationFn: async (id: string) => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminDeleteCoOrganiser({ data: { idToken: tok, id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-co-organisers'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
    },
  });

  // ── Mutation: Upsert Developer ────────────────────────────────────────────
  const upsertDeveloperMutation = useMutation({
    mutationFn: async () => {
      const tok = idTokenFromCtx || await getIdToken() || '';
      await adminUpsertDeveloper({ data: { idToken: tok, ...devForm } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-developers'] });
      queryClient.invalidateQueries({ queryKey: ['public-data'] });
      setShowEditDevModal(false);
    },
  });

  // ── Export Handler ────────────────────────────────────────────────────────
  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const tok = idTokenFromCtx || await getIdToken() || '';
      const backup = await adminExportData({ data: { idToken: tok } });
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `yds-2026-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(`Export failed: ${err?.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCompendiumCsvExport = async (statusFilter: string) => {
    setIsExportingCompendium(true);
    try {
      const tok = idTokenFromCtx || await getIdToken() || '';
      const data = await adminExportCompendium({ data: { idToken: tok, statusFilter, format: 'CSV', includePartyAllocation: exportIncludeParty } });
      const teams: any[] = data.teams ?? [];
      const headers = ['S.No', 'App ID', 'Team Name', 'Status', 'Member 1 Name', 'Member 1 Email', 'Member 1 Phone', 'Member 1 College', 'Member 1 Year',
        'Member 2 Name', 'Member 2 Email', 'Member 2 Phone', 'Member 2 College', 'Member 2 Year',
        'Member 3 Name', 'Member 3 Email', 'Member 3 Phone', 'Member 3 College', 'Member 3 Year',
        'Member 4 Name', 'Member 4 Email', 'Member 4 Phone', 'Member 4 College', 'Member 4 Year',
        'Member 5 Name', 'Member 5 Email', 'Member 5 Phone', 'Member 5 College', 'Member 5 Year',
        ...(exportIncludeParty ? ['Assigned Party'] : []),
        'Submitted At',
      ];
      const rows = teams.map((t: any) => {
        const memberCols: string[] = [];
        for (let i = 0; i < 5; i++) {
          const m = t.members?.[i];
          memberCols.push(m?.fullName ?? 'N/A', m?.email ?? 'N/A', m?.contactNumber ?? 'N/A', m?.college ?? 'N/A', m?.yearOfStudy ?? 'N/A');
        }
        return [
          t.sNo, t.applicationId, t.teamName, t.displayStatus,
          ...memberCols,
          ...(exportIncludeParty ? [t.assignedPartyName ?? 'Not Allocated'] : []),
          t.submittedAt ? new Date(t.submittedAt).toLocaleString() : '',
        ].map((v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',');
      });
      const csv = [headers.map((h) => `"${h}"`).join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `yds-2026-compendium-${statusFilter.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowExportModal(false);
    } catch (err: any) {
      alert(`Export failed: ${err?.message || err}`);
    } finally {
      setIsExportingCompendium(false);
    }
  };

  const handleClearApplications = async () => {
    if (!confirm('⚠️ DANGER: This will permanently delete ALL application documents from the database. This cannot be undone. Type "DELETE ALL" to confirm.')) return;
    const confirm2 = window.prompt('Type DELETE ALL to confirm permanent deletion:');
    if (confirm2 !== 'DELETE ALL') { alert('Cancelled — text did not match.'); return; }
    setIsClearingApps(true);
    try {
      const tok = idTokenFromCtx || await getIdToken() || '';
      const res = await adminClearApplications({ data: { idToken: tok } });
      alert(`✅ Deleted ${(res as any).deletedCount} application records successfully.`);
      queryClient.invalidateQueries({ queryKey: ['admin-registrations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-compendium'] });
    } catch (err: any) {
      alert(`Failed: ${err?.message || err}`);
    } finally {
      setIsClearingApps(false);
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await fbSignOut(firebaseAuth);
    navigate({ to: '/auth', replace: true });
  };

  const applications = registrationsQuery.data?.applications ?? [];
  const totalPages = registrationsQuery.data?.totalPages ?? 1;
  const totalCount = registrationsQuery.data?.totalCount ?? 0;
  const acceptedApps = acceptedAppsQuery.data ?? [];
  const parties = partiesQuery.data ?? [];
  const sponsors = sponsorsQuery.data ?? [];
  const organisers = organisersQuery.data ?? [];
  const coOrganisers = coOrganisersQuery.data ?? [];
  const developers = developersQuery.data ?? [];
  const dbStats = dbStatsQuery.data;
  const resultsReleased = resultsStatusQuery.data?.released ?? false;
  const stats = statsQuery.data ?? {
    total: 0, pending: 0, accepted: 0, waitlisted: 0, declined: 0,
    partiesAllocated: 0, partiesRemaining: YDS_CONFIG.totalParties, activeSponsors: 0,
  };

  const filteredApps = useMemo(() => {
    return applications.filter(({ parsed }) => {
      if (appFilter !== 'ALL' && parsed.status !== appFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          parsed.temporaryTeamName.toLowerCase().includes(q) ||
          parsed.applicationId.toLowerCase().includes(q) ||
          parsed.teamLeader.fullName.toLowerCase().includes(q) ||
          parsed.teamLeader.email.toLowerCase().includes(q) ||
          parsed.teamLeader.collegeName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, appFilter, searchQuery]);

  const activeDetailApp = useMemo(() => {
    if (!selectedAppId) return null;
    return applicationDetailQuery.data ?? applications.find((a) => a.id === selectedAppId) ?? null;
  }, [selectedAppId, applicationDetailQuery.data, applications]);

  const allocatedPartyIds = useMemo(() => {
    const set = new Set<string>();
    acceptedApps.forEach((a) => {
      if (a.parsed.assignedPartyId && a.parsed.status === 'ACCEPTED') {
        set.add(a.parsed.assignedPartyId);
      }
    });
    return set;
  }, [acceptedApps]);

  return (
    <main className="admin-page yds-admin-container">
      {/* Header */}
      <header className="admin-header">
        <div>
          <span className="eyebrow">NSS MJCET · ORGANISING COMMITTEE</span>
          <h1>Youth Democratic <em>Summit 2026</em></h1>
          <p className="text-xs text-muted-foreground mt-1">
            Logged in as: <strong>{adminUserEmail}</strong>
            {isSuperAdmin && (
              <span className="ml-2 inline-flex items-center gap-1 text-[10px] bg-gold/10 text-gold border border-gold/40 px-2 py-0.5 rounded font-bold">
                <Shield size={10} /> SUPER ADMIN
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild size="sm">
            <a href="/" target="_blank">View Website <ExternalLink size={14} /></a>
          </Button>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sign out <LogOut size={14} />
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="yds-admin-nav">
        {([
          ['overview', 'Overview', null],
          ['applications', 'Applications', stats.total],
          ['party-allocation', 'Party Allocation', stats.accepted],
          ['parties-config', 'Parties Master', parties.length],
          ['results', 'Results', null],
          ['compendium', 'Master Compendium', stats.total],
          ['sponsors', 'Sponsors', sponsors.length],
          ['organisers', 'Organisers', organisers.length],
          ['co-organisers', 'Co-Organisers', coOrganisers.length],
          ['developers', 'Developers', null],
          ['storage', 'Storage & Backup', null],
        ] as [AdminNavTab, string, number | null][]).map(([tab, label, count]) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'yds-nav-btn active' : 'yds-nav-btn'}
            onClick={() => { setActiveTab(tab); setSelectedAppId(null); }}
          >
            {label}
            {count !== null && <span className="yds-badge">{count}</span>}
            {tab === 'results' && resultsReleased && <span className="yds-badge-green">LIVE</span>}
          </button>
        ))}
        {isSuperAdmin && (
          <>
            <button
              type="button"
              className={activeTab === 'audit' ? 'yds-nav-btn active' : 'yds-nav-btn'}
              onClick={() => { setActiveTab('audit'); setSelectedAppId(null); }}
            >
              <FileText size={13} /> Audit Log
            </button>
            <button
              type="button"
              className={activeTab === 'admins' ? 'yds-nav-btn active' : 'yds-nav-btn'}
              onClick={() => { setActiveTab('admins'); setSelectedAppId(null); }}
            >
              <Shield size={13} /> Admins
            </button>
          </>
        )}
      </nav>

      {/* ── TAB: OVERVIEW ───────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="yds-stat-box"><span className="stat-label">TOTAL APPLICATIONS</span><span className="stat-val">{stats.total}</span><span className="stat-sub">5 members per team</span></div>
            <div className="yds-stat-box border-gold/40"><span className="stat-label text-gold">PENDING REVIEW</span><span className="stat-val">{stats.pending}</span><span className="stat-sub">Awaiting decision</span></div>
            <div className="yds-stat-box border-green-500/40"><span className="stat-label text-green-600">ACCEPTED</span><span className="stat-val text-green-600">{stats.accepted}</span><span className="stat-sub">Target: 25 teams</span></div>
            <div className="yds-stat-box"><span className="stat-label text-amber-600">WAITLISTED</span><span className="stat-val text-amber-600">{stats.waitlisted}</span><span className="stat-sub">Kept on standby</span></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="yds-stat-box"><span className="stat-label text-destructive">DECLINED</span><span className="stat-val text-destructive">{stats.declined}</span><span className="stat-sub">Preserved in system</span></div>
            <div className="yds-stat-box"><span className="stat-label">PARTIES ALLOCATED</span><span className="stat-val">{stats.partiesAllocated} / {YDS_CONFIG.totalParties}</span><span className="stat-sub">{stats.partiesRemaining} remaining</span></div>
            <div className="yds-stat-box"><span className="stat-label">PUBLIC RESULTS</span><span className={`stat-val ${resultsReleased ? 'text-green-600' : 'text-muted-foreground'}`}>{resultsReleased ? 'RELEASED' : 'HIDDEN'}</span><span className="stat-sub">{resultsReleased ? 'Visible to public' : 'Hidden from public'}</span></div>
          </div>
          <div className="yds-card p-6 space-y-4">
            <h3 className="font-serif text-xl">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => { setAppFilter('PENDING'); setActiveTab('applications'); }}>Review Pending ({stats.pending})</Button>
              <Button variant="outline" onClick={() => setActiveTab('party-allocation')}>Party Allocation ({stats.accepted} Accepted)</Button>
              <Button variant={resultsReleased ? 'outline' : 'default'} onClick={() => setActiveTab('results')}>{resultsReleased ? 'Manage Published Results' : 'Preview & Release Results'}</Button>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: APPLICATIONS ─────────────────────────────────────────────── */}
      {activeTab === 'applications' && (
        <section className="space-y-6 animate-in fade-in-50">
          {!selectedAppId ? (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {(['ALL', 'PENDING', 'ACCEPTED', 'WAITLISTED', 'DECLINED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`yds-filter-tab ${appFilter === st ? 'active' : ''}`}
                      onClick={() => {
                        setAppFilter(st);
                        setAppPage(1);
                      }}
                    >
                      {st} <span className="opacity-60 text-xs">{st === 'ALL' ? stats.total : st === 'PENDING' ? stats.pending : st === 'ACCEPTED' ? stats.accepted : st === 'WAITLISTED' ? stats.waitlisted : stats.declined}</span>
                    </button>
                  ))}
                </div>
                <div className="relative min-w-[260px]">
                  <Search size={15} className="absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    className="yds-search-input pl-9"
                    placeholder="Search by ID, team, leader..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setAppPage(1);
                    }}
                  />
                </div>
              </div>

              {registrationsQuery.isLoading ? (
                <p className="admin-note">Loading applications from MongoDB…</p>
              ) : filteredApps.length === 0 ? (
                <div className="yds-card p-10 text-center"><p className="text-muted-foreground">No applications match your current filter.</p></div>
              ) : (
                <div className="space-y-3">
                  {filteredApps.map(({ id, parsed }) => (
                    <article key={id} className="yds-app-card">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="yds-app-id">{parsed.applicationId}</span>
                            <span className={`yds-status-badge status-${parsed.status.toLowerCase()}`}>{parsed.status}</span>
                            {parsed.recommendation.hasRecommendation && (
                              <span className="text-[10px] bg-gold/10 text-gold border border-gold/40 px-2 py-0.5 rounded font-semibold">RECOMMENDED</span>
                            )}
                          </div>
                          <h3 className="font-serif text-xl font-medium">{parsed.temporaryTeamName}</h3>
                          <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                            <span><strong>Leader:</strong> {parsed.teamLeader.fullName}</span>
                            <span><strong>College:</strong> {parsed.teamLeader.collegeName}</span>
                            <span><strong>Submitted:</strong> {new Date(parsed.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <a href={`mailto:${parsed.teamLeader.email}?subject=YDS 2026 Application Update - ${encodeURIComponent(parsed.temporaryTeamName)}`} className="yds-action-link" title="Email Team Leader">
                            <Mail size={14} /><span>{parsed.teamLeader.email}</span>
                          </a>
                          <Button size="sm" variant="outline" onClick={() => { setSelectedAppId(id); setSelectedAppNotes(parsed.adminNotes || ''); }} className="gap-1.5">
                            <Eye size={14} /> Full Review
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 bg-card/60 border rounded-lg mt-4">
                      <span className="text-xs text-muted-foreground">
                        Page <strong>{appPage}</strong> of <strong>{totalPages}</strong> ({totalCount} total applications)
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={appPage <= 1 || registrationsQuery.isFetching}
                          onClick={() => setAppPage((p) => Math.max(1, p - 1))}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={appPage >= totalPages || registrationsQuery.isFetching}
                          onClick={() => setAppPage((p) => Math.min(totalPages, p + 1))}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            activeDetailApp && (
              <div className="yds-card p-6 sm:p-8 space-y-6 animate-in slide-in-from-right-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAppId(null)}>← Back to List</Button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Application:</span>
                    <span className="font-bold text-sm text-gold">{activeDetailApp.parsed.applicationId}</span>
                    <span className={`yds-status-badge status-${activeDetailApp.parsed.status.toLowerCase()}`}>{activeDetailApp.parsed.status}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 p-4 border rounded">
                  <div>
                    <span className="eyebrow">TEMPORARY TEAM IDENTIFIER</span>
                    <h2 className="font-serif text-2xl font-bold">{activeDetailApp.parsed.temporaryTeamName}</h2>
                    <p className="text-xs text-muted-foreground mt-1">Submitted: {new Date(activeDetailApp.parsed.submittedAt).toLocaleString()}</p>
                  </div>
                  <a href={`mailto:${activeDetailApp.parsed.teamLeader.email}?subject=YDS 2026 Selection Notification - ${encodeURIComponent(activeDetailApp.parsed.temporaryTeamName)}`} className="yds-email-btn">
                    <Mail size={15} /> Send Selection Mail
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="yds-card-sub p-4 space-y-3">
                    <span className="eyebrow text-gold">MEMBER 1 — TEAM LEADER</span>
                    <h4 className="font-serif text-lg font-semibold">{activeDetailApp.parsed.teamLeader.fullName}</h4>
                    <div className="text-xs space-y-1.5 text-muted-foreground">
                      <p><strong>Email:</strong> <a href={`mailto:${activeDetailApp.parsed.teamLeader.email}`} className="text-primary underline">{activeDetailApp.parsed.teamLeader.email}</a></p>
                      <p><strong>Phone:</strong> {activeDetailApp.parsed.teamLeader.contactNumber}</p>
                      <p><strong>College:</strong> {activeDetailApp.parsed.teamLeader.collegeName}</p>
                      <p><strong>Year:</strong> {activeDetailApp.parsed.teamLeader.yearOfStudy}</p>
                    </div>
                  </div>
                  <div className="yds-card-sub p-4 space-y-3">
                    <span className="eyebrow">RECOMMENDATION</span>
                    <p className="text-sm"><strong>Recommended?</strong> <span className={activeDetailApp.parsed.recommendation.hasRecommendation ? 'text-green-600 font-bold' : ''}>{activeDetailApp.parsed.recommendation.hasRecommendation ? 'YES' : 'NO'}</span></p>
                    {activeDetailApp.parsed.recommendation.hasRecommendation && <p className="text-xs text-muted-foreground"><strong>Recommender:</strong> {activeDetailApp.parsed.recommendation.recommenderName}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="eyebrow">ALL FIVE TEAM MEMBERS</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {activeDetailApp.parsed.members.map((m, idx) => (
                      <div key={idx} className="yds-card-sub p-3 space-y-1 text-xs">
                        <span className="font-bold text-gold">MEMBER {idx + 2}</span>
                        <p className="font-semibold text-sm">{m.fullName || '—'}</p>
                        <p className="text-muted-foreground">Phone: {m.contactNumber || '—'}</p>
                        {m.email && <p className="text-muted-foreground">Email: {m.email}</p>}
                        {m.college && <p className="text-muted-foreground">College: {m.college}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="yds-card-sub p-5 space-y-2 border-l-4 border-gold">
                  <span className="eyebrow text-gold">POLITICAL AGENDA</span>
                  <div className="text-xs text-muted-foreground">~{activeDetailApp.parsed.politicalAgenda.split(/\s+/).length} words</div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap bg-background p-4 border rounded font-serif text-foreground/90">
                    {activeDetailApp.parsed.politicalAgenda || 'No agenda submitted.'}
                  </div>
                </div>

                <div className="yds-card-sub p-4 space-y-2">
                  <span className="eyebrow">EXPERIENCE</span>
                  <p className="text-xs"><strong>NSS MJCET MUN prior participation:</strong> {activeDetailApp.parsed.experience.hasNssMjcetMun ? 'Yes' : 'No'}</p>
                  {activeDetailApp.parsed.experience.munEventDetails && <p className="text-xs text-muted-foreground"><strong>Details:</strong> {activeDetailApp.parsed.experience.munEventDetails}</p>}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeDetailApp.parsed.experience.strongestAreas.map((area) => (
                      <span key={area} className="text-[11px] bg-muted px-2 py-0.5 rounded border">{area}</span>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="yds-card-sub p-4 space-y-2">
                  <span className="eyebrow">ADMIN NOTES (PRIVATE)</span>
                  <textarea
                    className="yds-search-input w-full min-h-[80px] resize-y text-xs"
                    placeholder="Internal notes visible only to admins..."
                    value={selectedAppNotes}
                    onChange={(e) => setSelectedAppNotes(e.target.value)}
                  />
                </div>

                <div className="p-4 bg-muted/40 border rounded space-y-4">
                  <span className="eyebrow">ADMIN DECISION</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" className="bg-green-700 hover:bg-green-800 text-white gap-1.5" disabled={updateStatusMutation.isPending} onClick={() => updateStatusMutation.mutate({ rowId: activeDetailApp.id, newStatus: 'ACCEPTED', adminNotes: selectedAppNotes })}>
                      <Check size={16} /> ACCEPT TEAM
                    </Button>
                    <Button type="button" variant="outline" className="text-amber-700 border-amber-600 hover:bg-amber-50" disabled={updateStatusMutation.isPending} onClick={() => updateStatusMutation.mutate({ rowId: activeDetailApp.id, newStatus: 'WAITLISTED', adminNotes: selectedAppNotes })}>
                      <Clock size={16} /> WAITLIST TEAM
                    </Button>
                    <Button type="button" variant="destructive" disabled={updateStatusMutation.isPending} onClick={() => updateStatusMutation.mutate({ rowId: activeDetailApp.id, newStatus: 'DECLINED', adminNotes: selectedAppNotes })}>
                      <X size={16} /> DECLINE
                    </Button>
                    <Button type="button" variant="ghost" disabled={updateStatusMutation.isPending} onClick={() => updateStatusMutation.mutate({ rowId: activeDetailApp.id, newStatus: 'PENDING', adminNotes: selectedAppNotes })}>
                      Reset to Pending
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Declining an application never deletes it. It remains stored with full audit history.</p>
                </div>

                {/* Audit Log for this application */}
                <div className="yds-card-sub p-4 space-y-2">
                  <span className="eyebrow">APPLICATION AUDIT LOG</span>
                  <div className="space-y-2">
                    {[...(activeDetailApp.parsed.auditLog ?? [])].reverse().map((entry, i) => (
                      <div key={i} className="text-xs border-l-2 border-muted pl-3 space-y-0.5">
                        <p className="font-semibold">{entry.action}</p>
                        <p className="text-muted-foreground">{new Date(entry.timestamp).toLocaleString()}{entry.adminEmail ? ` · ${entry.adminEmail}` : ''}</p>
                        {entry.details && <p className="text-muted-foreground italic">{entry.details}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </section>
      )}

      {/* ── TAB: PARTY ALLOCATION ──────────────────────────────────────────── */}
      {activeTab === 'party-allocation' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="yds-card p-6 space-y-2">
            <span className="eyebrow">PARLIAMENTARY ASSIGNMENT</span>
            <h2 className="font-serif text-2xl">Allocate Fictional Parliamentary Parties</h2>
            <p className="text-xs text-muted-foreground max-w-2xl">Only accepted teams can be assigned a party. Each party is unique and cannot be allocated to more than one team. Backend enforces atomicity.</p>
          </div>
          <div className="space-y-4">
            {acceptedApps.length === 0 ? (
              <div className="yds-card p-10 text-center"><p className="text-muted-foreground">No teams have been marked as ACCEPTED yet.</p></div>
            ) : (
              acceptedApps.map(({ id, parsed }) => (
                <article key={id} className="yds-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="yds-app-id">{parsed.applicationId}</span>
                      <span className="yds-status-badge status-accepted">ACCEPTED</span>
                    </div>
                    <h3 className="font-serif text-xl">{parsed.temporaryTeamName}</h3>
                    <p className="text-xs text-muted-foreground">Leader: {parsed.teamLeader.fullName} ({parsed.teamLeader.collegeName})</p>
                  </div>
                  <div className="space-y-2 min-w-[220px]">
                    {parsed.assignedPartyName ? (
                      <div className="text-sm font-semibold text-green-700 flex items-center gap-2">
                        <CheckCircle2 size={16} /> {parsed.assignedPartyName}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground italic">No party assigned</div>
                    )}
                    <select
                      className="yds-search-input text-xs w-full"
                      value={parsed.assignedPartyId ?? ''}
                      disabled={allocatePartyMutation.isPending}
                      onChange={(e) => {
                        if (!e.target.value) return;
                        allocatePartyMutation.mutate({ applicationId: id, partyId: e.target.value });
                      }}
                    >
                      <option value="">— Select Party —</option>
                      {parties.map((p: any) => (
                        <option key={p.id} value={p.id} disabled={allocatedPartyIds.has(p.id) && p.id !== parsed.assignedPartyId}>
                          {p.name}{allocatedPartyIds.has(p.id) && p.id !== parsed.assignedPartyId ? ' (assigned)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      )}

      {/* ── TAB: PARTIES MASTER ───────────────────────────────────────────── */}
      {activeTab === 'parties-config' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">25 FICTIONAL PARLIAMENTARY PARTIES</span>
              <h2 className="font-serif text-2xl">Party Configuration</h2>
            </div>
            <Button onClick={() => { setEditPartyId(null); setPartyForm({ name: '', abbreviation: '', ideology: '', historyDescription: '', sortOrder: 99, classification: 'INDEPENDENT', formationDate: '' }); setPartyLogoBase64(null); setShowAddPartyModal(true); }} className="gap-2">
              <Plus size={16} /> Add Party
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parties.map((p: any) => (
              <div key={p.id} className="yds-card p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {p.logoId && <img src={`/api/images/${p.logoId}`} alt={p.name} className="w-8 h-8 rounded object-contain" />}
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-semibold text-sm">{p.name}</p>
                        {p.classification && (
                          <span className="text-[9px] bg-gold/10 text-gold border border-gold/30 px-1 py-0.5 rounded font-bold">
                            {p.classification}
                          </span>
                        )}
                      </div>
                      {p.abbreviation && <p className="text-xs text-muted-foreground">{p.abbreviation}</p>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => { setEditPartyId(p.id); setPartyForm({ name: p.name, abbreviation: p.abbreviation || '', ideology: p.ideology || '', historyDescription: p.historyDescription || '', sortOrder: p.sortOrder ?? 99, classification: p.classification || 'INDEPENDENT', formationDate: p.formationDate || '' }); setPartyLogoBase64(null); setShowAddPartyModal(true); }}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { if (confirm(`Delete party "${p.name}"?`)) deletePartyMutation.mutate(p.id); }}><Trash2 size={14} /></Button>
                  </div>
                </div>
                {p.formationDate && <p className="text-xs text-muted-foreground">Formed: {p.formationDate}</p>}
                {p.ideology && <p className="text-xs text-muted-foreground">{p.ideology}</p>}
                {p.assignedTeamName && <p className="text-xs text-green-600 font-medium">Assigned: {p.assignedTeamName}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB: RESULTS ─────────────────────────────────────────────────── */}
      {activeTab === 'results' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="yds-card p-6 space-y-4">
            <span className="eyebrow">RESULTS MANAGEMENT</span>
            <h2 className="font-serif text-2xl">Public Results Gate</h2>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded border ${resultsReleased ? 'bg-green-50 border-green-300 text-green-700' : 'bg-muted border-border text-muted-foreground'}`}>
              {resultsReleased ? <><CheckCircle2 size={16} /> Results are LIVE — visible to the public</> : <><Lock size={16} /> Results are HIDDEN — not yet visible to the public</>}
            </div>
            {isSuperAdmin ? (
              resultsReleased ? (
                <Button variant="destructive" onClick={() => setShowReleaseModal(true)}>
                  <Lock size={16} /> Hide Results from Public
                </Button>
              ) : (
                <Button className="bg-green-700 hover:bg-green-800 text-white" onClick={() => setShowReleaseModal(true)}>
                  <Unlock size={16} /> Release Results to Public
                </Button>
              )
            ) : (
              <p className="text-xs text-muted-foreground">Only the Super Admin can release or hide results.</p>
            )}
          </div>

          <div className="yds-card p-6 space-y-4">
            <span className="eyebrow">ADMIN PREVIEW — ACCEPTED TEAMS</span>
            {applications.filter((a) => a.parsed.status === 'ACCEPTED').length === 0 ? (
              <p className="text-muted-foreground text-sm">No accepted teams yet.</p>
            ) : (
              <div className="space-y-3">
                {applications.filter((a) => a.parsed.status === 'ACCEPTED').map(({ id, parsed }) => (
                  <div key={id} className="text-sm flex items-center justify-between border rounded p-3">
                    <div>
                      <span className="font-semibold">{parsed.temporaryTeamName}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{parsed.teamLeader.collegeName}</span>
                    </div>
                    <span className={parsed.assignedPartyName ? 'text-xs text-green-700 font-medium' : 'text-xs text-muted-foreground italic'}>
                      {parsed.assignedPartyName ?? 'No party assigned'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── TAB: MASTER COMPENDIUM ────────────────────────────────────────── */}
      {activeTab === 'compendium' && (() => {
        const compData = compendiumQuery.data as any;
        const compTeams: any[] = compData?.teams ?? [];
        const compSummary = compData?.summary ?? {};
        const compTotalPages = compData?.totalPages ?? 1;
        const statusChipClass = (s: string) => {
          if (s === 'SELECTED') return 'comp-chip comp-chip-selected';
          if (s === 'WAITLISTED') return 'comp-chip comp-chip-waitlisted';
          if (s === 'NOT SELECTED') return 'comp-chip comp-chip-declined';
          return 'comp-chip comp-chip-pending';
        };
        const sortIcon = (col: string) => compendiumSortBy === col ? (compendiumSortOrder === -1 ? ' ↓' : ' ↑') : '';
        return (
          <section className="space-y-6 animate-in fade-in-50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">YDS 2026 · ALL REGISTRATIONS</span>
                <h2 className="font-serif text-2xl">Master Compendium</h2>
                <p className="text-xs text-muted-foreground mt-1">Complete list of all team applications — names, contacts, colleges.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => window.print()}>
                  <Printer size={14} /> Print
                </Button>
                <Button size="sm" className="gap-1 bg-gold text-deep hover:bg-gold/90 font-bold" onClick={() => setShowExportModal(true)}>
                  <Download size={14} /> Export CSV
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            {compData && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="yds-stat-box"><span className="stat-label">TOTAL TEAMS</span><span className="stat-val">{compSummary.totalApplications ?? 0}</span><span className="stat-sub">{(compSummary.totalParticipants ?? 0)} participants</span></div>
                <div className="yds-stat-box border-green-500/40"><span className="stat-label text-green-600">SELECTED</span><span className="stat-val text-green-600">{compSummary.selectedTeams ?? 0}</span><span className="stat-sub">Accepted teams</span></div>
                <div className="yds-stat-box border-amber-500/40"><span className="stat-label text-amber-600">WAITLISTED</span><span className="stat-val text-amber-600">{compSummary.waitlistedTeams ?? 0}</span><span className="stat-sub">On standby</span></div>
                <div className="yds-stat-box"><span className="stat-label text-muted-foreground">PENDING</span><span className="stat-val">{compSummary.pendingTeams ?? 0}</span><span className="stat-sub">Awaiting review</span></div>
              </div>
            )}

            {/* Filters + Search */}
            <div className="yds-card p-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="yds-search-input pl-8 w-full"
                    placeholder="Search team name, leader name, college, app ID…"
                    value={compendiumSearch}
                    onChange={(e) => { setCompendiumSearch(e.target.value); setCompendiumPage(1); }}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(['ALL', 'PENDING', 'ACCEPTED', 'WAITLISTED', 'DECLINED'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={compendiumStatusFilter === s ? 'yds-filter-tab active' : 'yds-filter-tab'}
                      onClick={() => { setCompendiumStatusFilter(s); setCompendiumPage(1); }}
                    >{s === 'ALL' ? 'All' : s === 'ACCEPTED' ? 'Selected' : s.charAt(0) + s.slice(1).toLowerCase()}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Filter size={12} />
                <span>Sort by:</span>
                {(['submittedAt', 'teamName', 'leaderName', 'college', 'status'] as const).map((col) => (
                  <button
                    key={col}
                    type="button"
                    className={`px-2 py-0.5 rounded border text-xs transition-colors ${compendiumSortBy === col ? 'border-gold text-gold bg-gold/10' : 'border-border hover:border-gold/50'}`}
                    onClick={() => {
                      if (compendiumSortBy === col) setCompendiumSortOrder(compendiumSortOrder === -1 ? 1 : -1);
                      else { setCompendiumSortBy(col); setCompendiumSortOrder(-1); }
                    }}
                  >
                    {col === 'submittedAt' ? 'Date' : col === 'teamName' ? 'Team' : col === 'leaderName' ? 'Leader' : col === 'college' ? 'College' : 'Status'}{sortIcon(col)}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Table */}
            <div className="yds-card overflow-hidden">
              {compendiumQuery.isLoading ? (
                <div className="p-12 text-center text-muted-foreground text-sm">Loading compendium data…</div>
              ) : compTeams.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground text-sm">No teams found matching current filters.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="comp-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>App ID</th>
                        <th>Team Name</th>
                        <th>Status</th>
                        <th>Leader / Member 1</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>College</th>
                        <th>Year</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {compTeams.map((team: any) => (
                        <Fragment key={team.id}>
                          {/* Leader row */}
                          <tr className={expandedTeamId === team.id ? 'comp-row expanded' : 'comp-row'}>
                            <td className="text-muted-foreground text-xs">{team.sNo}</td>
                            <td><span className="yds-app-id">{team.applicationId}</span></td>
                            <td className="font-semibold">{team.teamName}</td>
                            <td><span className={statusChipClass(team.displayStatus)}>{team.displayStatus}</span></td>
                            <td className="font-medium">{team.members?.[0]?.fullName ?? '—'}</td>
                            <td className="text-xs text-muted-foreground">{team.members?.[0]?.email ?? '—'}</td>
                            <td className="text-xs font-mono">{team.members?.[0]?.contactNumber ?? '—'}</td>
                            <td className="text-xs">{team.members?.[0]?.college ?? '—'}</td>
                            <td className="text-xs">{team.members?.[0]?.yearOfStudy ?? '—'}</td>
                            <td>
                              <button
                                type="button"
                                className="comp-expand-btn"
                                onClick={() => setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                                title="Show all members"
                              >
                                <ChevronDown size={14} className={expandedTeamId === team.id ? 'rotate-180 transition-transform' : 'transition-transform'} />
                              </button>
                            </td>
                          </tr>
                          {/* Expanded member rows */}
                          {expandedTeamId === team.id && team.members?.slice(1).map((m: any, mi: number) => (
                            <tr key={`${team.id}-m${mi + 2}`} className="comp-row-member">
                              <td colSpan={4} className="text-xs text-muted-foreground pl-8">Member {mi + 2}</td>
                              <td className="font-medium text-sm">{m.fullName ?? '—'}</td>
                              <td className="text-xs text-muted-foreground">{m.email ?? '—'}</td>
                              <td className="text-xs font-mono">{m.contactNumber ?? '—'}</td>
                              <td className="text-xs">{m.college ?? '—'}</td>
                              <td className="text-xs">{m.yearOfStudy ?? '—'}</td>
                              <td></td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            {compTotalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button size="sm" variant="outline" disabled={compendiumPage <= 1} onClick={() => setCompendiumPage(p => p - 1)}>← Prev</Button>
                <span className="text-xs text-muted-foreground">Page {compendiumPage} of {compTotalPages}</span>
                <Button size="sm" variant="outline" disabled={compendiumPage >= compTotalPages} onClick={() => setCompendiumPage(p => p + 1)}>Next →</Button>
              </div>
            )}

            {/* Export Modal */}
            {showExportModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="yds-card p-8 w-full max-w-md space-y-5 shadow-2xl">
                  <h3 className="font-serif text-xl">Export Compendium as CSV</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={exportIncludeParty} onChange={(e) => setExportIncludeParty(e.target.checked)} />
                      Include Party Allocation column
                    </label>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['ALL', 'ACCEPTED', 'WAITLISTED', 'DECLINED', 'PENDING'].map((s) => (
                      <Button key={s} size="sm" variant="outline" disabled={isExportingCompendium}
                        onClick={() => handleCompendiumCsvExport(s)}>
                        <Download size={12} className="mr-1" />
                        {s === 'ALL' ? 'All Teams' : s === 'ACCEPTED' ? 'Selected Only' : s.charAt(0) + s.slice(1).toLowerCase()} CSV
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setShowExportModal(false)}>Close</Button>
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })()}

      {/* ── TAB: SPONSORS ────────────────────────────────────────────────── */}
      {activeTab === 'sponsors' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">SPONSORS & PARTNERS</span>
              <h2 className="font-serif text-2xl">Sponsor Management</h2>
            </div>
            <Button onClick={() => { setEditSponsorId(null); setSponsorForm({ name: '', category: 'Title Sponsor', websiteUrl: '', description: '', displayOrder: 99, isActive: true }); setSponsorLogoBase64(null); setShowAddSponsorModal(true); }} className="gap-2">
              <Plus size={16} /> Add Sponsor
            </Button>
          </div>

          {sponsors.length === 0 ? (
            <div className="yds-card p-10 text-center"><p className="text-muted-foreground">No sponsors added yet.</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sponsors.map((s: any) => (
                <div key={s.id} className="yds-card p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {s.logoId && <img src={`/api/images/${s.logoId}`} alt={s.name} className="w-12 h-12 object-contain rounded" />}
                      <div>
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.category}</p>
                        {s.websiteUrl && <a href={s.websiteUrl} target="_blank" rel="noreferrer" className="text-xs text-primary underline">Website</a>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => { setEditSponsorId(s.id); setSponsorForm({ name: s.name, category: s.category, websiteUrl: s.websiteUrl || '', description: s.description || '', displayOrder: s.displayOrder ?? 99, isActive: s.isActive !== false }); setSponsorLogoBase64(null); setShowAddSponsorModal(true); }}>Edit</Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { if (confirm(`Delete sponsor "${s.name}"?`)) deleteSponsorMutation.mutate(s.id); }}><Trash2 size={14} /></Button>
                    </div>
                  </div>
                  {!s.isActive && <span className="text-xs text-amber-600 font-medium">INACTIVE (hidden from public)</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── TAB: ORGANISERS ──────────────────────────────────────────────── */}
      {activeTab === 'organisers' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">SUMMIT ORGANISING COMMITTEE</span>
              <h2 className="font-serif text-2xl">Organisers Management</h2>
              <p className="text-xs text-muted-foreground mt-1">Manage official YDS organisers. Photos and designations are stored dynamically in MongoDB.</p>
            </div>
            <Button
              onClick={() => {
                setEditOrganiserId(null);
                setOrganiserForm({ name: '', designation: '', displayOrder: organisers.length + 1, isActive: true, linkedinUrl: '' });
                setOrganiserPhotoBase64(null);
                setShowAddOrganiserModal(true);
              }}
              className="gap-2"
            >
              <Plus size={16} /> Add Organiser
            </Button>
          </div>

          {organisers.length === 0 ? (
            <div className="yds-card p-10 text-center">
              <p className="text-muted-foreground">No organisers added yet. Click &quot;Add Organiser&quot; to add committee members.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {organisers.map((o: any) => (
                <div key={o.id} className="yds-card p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-16 rounded bg-muted/40 border overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {o.photoId ? (
                        <img src={`/api/images/${o.photoId}`} alt={o.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{o.name}</p>
                      <p className="text-xs text-gold font-medium">{o.designation}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Order: {o.displayOrder ?? 99}</p>
                      {o.linkedinUrl && (
                        <a href={o.linkedinUrl} target="_blank" rel="noreferrer" className="text-[11px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${o.isActive !== false ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                      {o.isActive !== false ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditOrganiserId(o.id);
                          setOrganiserForm({ name: o.name, designation: o.designation, displayOrder: o.displayOrder ?? 99, isActive: o.isActive !== false, linkedinUrl: o.linkedinUrl || '' });
                          setOrganiserPhotoBase64(null);
                          setShowAddOrganiserModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm(`Delete organiser "${o.name}"?`)) deleteOrganiserMutation.mutate(o.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── TAB: CO-ORGANISERS ───────────────────────────────────────────── */}
      {activeTab === 'co-organisers' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <div>
              <span className="eyebrow">CO-ORGANISING COMMITTEE</span>
              <h2 className="font-serif text-2xl">Co-Organisers Management</h2>
              <p className="text-xs text-muted-foreground mt-1">Manage co-organisers and support committee members dynamically.</p>
            </div>
            <Button
              onClick={() => {
                setEditCoOrganiserId(null);
                setCoOrganiserForm({ name: '', designation: '', displayOrder: coOrganisers.length + 1, isActive: true, linkedinUrl: '' });
                setCoOrganiserPhotoBase64(null);
                setShowAddCoOrganiserModal(true);
              }}
              className="gap-2"
            >
              <Plus size={16} /> Add Co-Organiser
            </Button>
          </div>

          {coOrganisers.length === 0 ? (
            <div className="yds-card p-10 text-center">
              <p className="text-muted-foreground">No co-organisers added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coOrganisers.map((o: any) => (
                <div key={o.id} className="yds-card p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-16 rounded bg-muted/40 border overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {o.photoId ? (
                        <img src={`/api/images/${o.photoId}`} alt={o.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{o.name}</p>
                      <p className="text-xs text-gold font-medium">{o.designation}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Order: {o.displayOrder ?? 99}</p>
                      {o.linkedinUrl && (
                        <a href={o.linkedinUrl} target="_blank" rel="noreferrer" className="text-[11px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${o.isActive !== false ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                      {o.isActive !== false ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditCoOrganiserId(o.id);
                          setCoOrganiserForm({ name: o.name, designation: o.designation, displayOrder: o.displayOrder ?? 99, isActive: o.isActive !== false, linkedinUrl: o.linkedinUrl || '' });
                          setCoOrganiserPhotoBase64(null);
                          setShowAddCoOrganiserModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (confirm(`Delete co-organiser "${o.name}"?`)) deleteCoOrganiserMutation.mutate(o.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── TAB: DEVELOPERS ──────────────────────────────────────────────── */}
      {activeTab === 'developers' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="yds-card p-6 space-y-2">
            <span className="eyebrow">SYSTEM AUTHORS</span>
            <h2 className="font-serif text-2xl">Developers Configuration</h2>
            <p className="text-xs text-muted-foreground max-w-2xl">
              Configure GitHub and LinkedIn profile links for the two official developers. Only professional links are displayed publicly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {developers.map((dev: any) => (
              <div key={dev.id} className="yds-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold">{dev.name}</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={() => {
                      setDevForm({ id: dev.id, name: dev.name, githubUrl: dev.githubUrl || '', linkedinUrl: dev.linkedinUrl || '' });
                      setShowEditDevModal(true);
                    }}
                  >
                    <Edit size={13} /> Edit Links
                  </Button>
                </div>
                <div className="text-xs space-y-1.5 text-muted-foreground">
                  <p>
                    <strong>GitHub:</strong>{' '}
                    {dev.githubUrl ? (
                      <a href={dev.githubUrl} target="_blank" rel="noreferrer" className="text-primary underline">
                        {dev.githubUrl}
                      </a>
                    ) : (
                      <span className="italic">Not configured</span>
                    )}
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{' '}
                    {dev.linkedinUrl ? (
                      <a href={dev.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary underline">
                        {dev.linkedinUrl}
                      </a>
                    ) : (
                      <span className="italic">Not configured</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB: STORAGE & BACKUP ────────────────────────────────────────── */}
      {activeTab === 'storage' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="yds-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="eyebrow">FREE TIER STORAGE MONITORING</span>
                <h2 className="font-serif text-2xl">Database Storage &amp; Backup</h2>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                  MongoDB Atlas Free tier provides a <strong>512 MB total storage limit</strong> without built-in automated backups. Use the export tool below to safely archive summit data.
                </p>
              </div>
              <Button
                disabled={isExporting}
                onClick={handleExportData}
                className="gap-2 self-start bg-gold text-deep hover:bg-gold/90 font-bold"
              >
                <Download size={16} /> {isExporting ? 'Exporting…' : 'Export All Data (JSON)'}
              </Button>
            </div>

            {/* Storage Progress Bar */}
            <div className="p-5 bg-muted/20 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Storage Usage</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${
                  dbStats?.level === 'critical' ? 'bg-destructive/10 text-destructive border-destructive/40' :
                  dbStats?.level === 'warning' ? 'bg-amber-500/10 text-amber-600 border-amber-500/40' :
                  'bg-green-500/10 text-green-600 border-green-500/40'
                }`}>
                  {dbStats?.level ?? 'normal'}
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    dbStats?.level === 'critical' ? 'bg-destructive' :
                    dbStats?.level === 'warning' ? 'bg-amber-500' : 'bg-gold'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(2, dbStats?.usedPct ?? 1))}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{dbStats?.totalMB ?? 0} MB used</span>
                <span>{dbStats?.freeTierLimitMB ?? 512} MB total budget ({dbStats?.usedPct ?? 0}%)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-muted/10 border rounded text-xs">
                <span className="text-muted-foreground">Data Size</span>
                <p className="font-bold text-base mt-0.5">{dbStats?.dataSize ?? 0} MB</p>
              </div>
              <div className="p-3 bg-muted/10 border rounded text-xs">
                <span className="text-muted-foreground">Storage Allocated</span>
                <p className="font-bold text-base mt-0.5">{dbStats?.storageSize ?? 0} MB</p>
              </div>
              <div className="p-3 bg-muted/10 border rounded text-xs">
                <span className="text-muted-foreground">Indexes</span>
                <p className="font-bold text-base mt-0.5">{dbStats?.indexSize ?? 0} MB</p>
              </div>
            </div>
          </div>

          {/* Danger Zone — Super Admin Only */}
          {isSuperAdmin && (
            <div className="yds-card p-6 border-destructive/40 space-y-3">
              <div>
                <span className="eyebrow text-destructive">DANGER ZONE · SUPER ADMIN ONLY</span>
                <h3 className="font-serif text-xl text-destructive mt-1">Clear All Applications</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-lg">
                  Permanently deletes <strong>all</strong> application documents from the database. Use this to remove mock/test data before the event goes live.
                  This action is <strong>irreversible</strong>. An audit log entry will be created.
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                disabled={isClearingApps}
                onClick={handleClearApplications}
                className="gap-2"
              >
                <Trash2 size={14} />
                {isClearingApps ? 'Deleting…' : 'Clear All Applications'}
              </Button>
            </div>
          )}
        </section>
      )}

      {/* ── TAB: ADMINS (Super Admin only) ────────────────────────────────── */}
      {activeTab === 'admins' && isSuperAdmin && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="yds-card p-6 space-y-4">
            <span className="eyebrow">ADMIN USER MANAGEMENT</span>
            <h2 className="font-serif text-2xl">Authorized Organizers</h2>
            <p className="text-xs text-muted-foreground">Pre-authorize team members by email. They log in with Google OAuth and are verified against this list server-side.</p>

            <div className="flex gap-3">
              <input
                type="email"
                className="yds-search-input flex-1"
                placeholder="admin@example.com"
                value={newAdminEmail}
                onChange={(e) => { setNewAdminEmail(e.target.value); setAdminError(''); setAdminSuccess(''); }}
              />
              <Button
                disabled={isAddingAdmin || !newAdminEmail.trim()}
                onClick={async () => {
                  setIsAddingAdmin(true);
                  setAdminError('');
                  setAdminSuccess('');
                  try {
                    const tok = idTokenFromCtx || await getIdToken() || '';
                    await adminAddAdminUser({ data: { idToken: tok, email: newAdminEmail.trim() } });
                    setAdminSuccess(`${newAdminEmail.trim()} has been authorized as an admin.`);
                    setNewAdminEmail('');
                    queryClient.invalidateQueries({ queryKey: ['admin-users'] });
                  } catch (err: any) {
                    setAdminError(err?.message || 'Failed to add admin.');
                  } finally {
                    setIsAddingAdmin(false);
                  }
                }}
                className="gap-2"
              >
                <UserPlus size={16} /> Add Admin
              </Button>
            </div>

            {adminError && <p className="text-sm text-destructive">{adminError}</p>}
            {adminSuccess && <p className="text-sm text-green-600">{adminSuccess}</p>}
          </div>

          {adminUsersQuery.isLoading ? (
            <p className="admin-note">Loading admin users…</p>
          ) : (
            <div className="space-y-3">
              {(adminUsersQuery.data ?? []).map((a: any) => (
                <div key={a.email} className="yds-card p-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{a.email}</span>
                      {a.role === 'SUPER_ADMIN' && <span className="text-[10px] bg-gold/10 text-gold border border-gold/40 px-2 py-0.5 rounded font-bold">SUPER ADMIN</span>}
                      {a.status === 'INACTIVE' && <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded font-bold">INACTIVE</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">Added by {a.addedBy} · {a.addedAt ? new Date(a.addedAt).toLocaleDateString() : ''}</p>
                    {a.lastLoginAt && <p className="text-xs text-muted-foreground">Last login: {new Date(a.lastLoginAt).toLocaleString()}</p>}
                  </div>
                  {a.role !== 'SUPER_ADMIN' && a.status === 'ACTIVE' && a.email.toLowerCase() !== 'nssmjcet@mjcollege.ac.in' && (
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/5" onClick={async () => {
                      if (!confirm(`Deactivate ${a.email}?`)) return;
                      const tok = idTokenFromCtx || await getIdToken() || '';
                      await adminRemoveAdminUser({ data: { idToken: tok, email: a.email } });
                      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
                    }}>
                      <Trash2 size={14} /> Deactivate
                    </Button>
                  )}
                  {a.email.toLowerCase() === 'nssmjcet@mjcollege.ac.in' && (
                    <span className="text-[10px] text-muted-foreground italic px-2">Permanent Admin</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── TAB: AUDIT LOG (SUPER ADMIN ONLY) ─────────────────────────────── */}
      {isSuperAdmin && activeTab === 'audit' && (
        <section className="space-y-6 animate-in fade-in-50">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="eyebrow">SYSTEM INTEGRITY &amp; GOVERNANCE</span>
              <h2 className="font-serif text-2xl flex items-center gap-2">
                Audit Log
                <span className="text-xs bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded font-sans font-semibold">
                  SUPER ADMIN ACCESS
                </span>
              </h2>
            </div>
            {auditLogsQuery.data && (
              <span className="text-xs text-muted-foreground">
                Showing {auditLogsQuery.data.length} recorded events
              </span>
            )}
          </div>

          {auditLogsQuery.isLoading ? (
            <p className="admin-note">Loading system audit trail…</p>
          ) : (auditLogsQuery.data ?? []).length === 0 ? (
            <div className="yds-card p-8 text-center text-sm text-muted-foreground">
              No audit log entries recorded yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {(auditLogsQuery.data ?? []).map((log: any) => {
                const act = (log.action || '').toUpperCase();
                let badgeClass = 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25';
                if (act.includes('DELET') || act.includes('CLEAR') || act.includes('DEACTIVAT') || act.includes('DECLIN') || act.includes('REMOV')) {
                  badgeClass = 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25';
                } else if (act.includes('ACCEPT') || act.includes('CREAT') || act.includes('ADD') || act.includes('RELEASE') || act.includes('ACTIVE')) {
                  badgeClass = 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/25';
                } else if (act.includes('STATUS') || act.includes('UPDAT') || act.includes('WAITLIST') || act.includes('HIDDEN')) {
                  badgeClass = 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25';
                } else if (act.includes('ALLOCAT') || act.includes('EXPORT')) {
                  badgeClass = 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/25';
                }

                return (
                  <div key={log.id} className="yds-card p-3.5 flex flex-col sm:flex-row items-start gap-3 text-xs border border-border/70 hover:border-gold/30 transition-colors">
                    <span className="text-muted-foreground min-w-[145px] text-[11px] font-mono shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                    <div className="flex-1 space-y-1 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${badgeClass}`}>
                          {log.action}
                        </span>
                        {log.collection && (
                          <span className="text-[10px] font-mono bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded border border-border/50 uppercase">
                            {log.collection}
                          </span>
                        )}
                        {log.adminEmail && (
                          <span className="text-muted-foreground text-[11px]">
                            by <span className="text-foreground font-medium">{log.adminEmail}</span>
                          </span>
                        )}
                      </div>
                      {log.details && (
                        <p className="text-muted-foreground text-[12px] leading-relaxed pt-0.5 break-words">
                          {log.details}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── MODAL: Release/Hide Results ───────────────────────────────────── */}
      {showReleaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background border rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle size={24} className="text-amber-500" />
              <h3 className="font-serif text-2xl">{resultsReleased ? 'Hide Results?' : 'Release Results?'}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {resultsReleased
                ? 'This will immediately hide the results from the public website. You can re-release them at any time.'
                : 'This will immediately publish the selected team results and party allocations to the public website. Make sure all party assignments are final before releasing.'}
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setShowReleaseModal(false)}>Cancel</Button>
              <Button
                className={resultsReleased ? 'bg-destructive hover:bg-destructive/90 text-white' : 'bg-green-700 hover:bg-green-800 text-white'}
                disabled={toggleResultsMutation.isPending}
                onClick={() => toggleResultsMutation.mutate(!resultsReleased)}
              >
                {toggleResultsMutation.isPending ? 'Processing…' : resultsReleased ? 'Hide Results' : 'Release Results'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Add/Edit Sponsor ───────────────────────────────────────── */}
      {showAddSponsorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4">
            <h3 className="font-serif text-xl">{editSponsorId ? 'Edit Sponsor' : 'Add New Sponsor'}</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Name *</label>
                <input className="yds-search-input w-full mt-1" value={sponsorForm.name} onChange={(e) => setSponsorForm((f) => ({ ...f, name: e.target.value }))} placeholder="Sponsor name" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Category *</label>
                <select className="yds-search-input w-full mt-1" value={sponsorForm.category} onChange={(e) => setSponsorForm((f) => ({ ...f, category: e.target.value }))}>
                  {['Title Sponsor', 'Co-Sponsor', 'Associate Sponsor', 'Powered By', 'Knowledge Partner', 'Media Partner', 'Community Partner', 'Outreach Partner'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Website URL</label>
                <input className="yds-search-input w-full mt-1" value={sponsorForm.websiteUrl} onChange={(e) => setSponsorForm((f) => ({ ...f, websiteUrl: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Logo (Image Upload)</label>
                <ImageInput
                  onImageSelect={(b64, name, type) => { setSponsorLogoBase64(b64); setSponsorLogoName(name); setSponsorLogoType(type); }}
                  currentImageUrl={null}
                  className="mt-1"
                />
                {sponsorLogoBase64 && <img src={`data:${sponsorLogoType};base64,${sponsorLogoBase64}`} alt="preview" className="mt-2 h-12 object-contain rounded border" />}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Display Order</label>
                  <input type="number" className="yds-search-input w-full mt-1" value={sponsorForm.displayOrder} onChange={(e) => setSponsorForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 99 }))} />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={sponsorForm.isActive} onChange={(e) => setSponsorForm((f) => ({ ...f, isActive: e.target.checked }))} />
                    <span className="text-sm">Active (show on website)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setShowAddSponsorModal(false)}>Cancel</Button>
              <Button disabled={upsertSponsorMutation.isPending || !sponsorForm.name.trim()} onClick={() => upsertSponsorMutation.mutate()}>
                {upsertSponsorMutation.isPending ? 'Saving…' : editSponsorId ? 'Save Changes' : 'Add Sponsor'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Add/Edit Party ─────────────────────────────────────────── */}
      {showAddPartyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4">
            <h3 className="font-serif text-xl">{editPartyId ? 'Edit Party' : 'Add New Party'}</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Party Name *</label>
                <input className="yds-search-input w-full mt-1" value={partyForm.name} onChange={(e) => setPartyForm((f) => ({ ...f, name: e.target.value }))} placeholder="Party name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Abbreviation</label>
                  <input className="yds-search-input w-full mt-1" value={partyForm.abbreviation} onChange={(e) => setPartyForm((f) => ({ ...f, abbreviation: e.target.value }))} placeholder="e.g. NDF, PPF" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Classification *</label>
                  <select
                    className="yds-search-input w-full mt-1"
                    value={partyForm.classification}
                    onChange={(e) => setPartyForm((f) => ({ ...f, classification: e.target.value }))}
                  >
                    <option value="I.N.D.I.A">I.N.D.I.A</option>
                    <option value="NDA">NDA</option>
                    <option value="FEDERAL BLOCK">FEDERAL BLOCK</option>
                    <option value="INDEPENDENT">INDEPENDENT</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Ideology</label>
                  <input className="yds-search-input w-full mt-1" value={partyForm.ideology} onChange={(e) => setPartyForm((f) => ({ ...f, ideology: e.target.value }))} placeholder="e.g. Social Democracy" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Formation Date / Year</label>
                  <input className="yds-search-input w-full mt-1" value={partyForm.formationDate} onChange={(e) => setPartyForm((f) => ({ ...f, formationDate: e.target.value }))} placeholder="e.g. 1985 or 15 Aug 2002" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">History / Description</label>
                <textarea className="yds-search-input w-full mt-1 min-h-[80px] resize-y" value={partyForm.historyDescription} onChange={(e) => setPartyForm((f) => ({ ...f, historyDescription: e.target.value }))} placeholder="Brief party history and political agenda..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Logo (Image Upload)</label>
                <ImageInput
                  onImageSelect={(b64, name, type) => { setPartyLogoBase64(b64); setPartyLogoName(name); setPartyLogoType(type); }}
                  currentImageUrl={null}
                  className="mt-1"
                />
                {partyLogoBase64 && <img src={`data:${partyLogoType};base64,${partyLogoBase64}`} alt="preview" className="mt-2 h-12 object-contain rounded border" />}
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Sort Order</label>
                <input type="number" className="yds-search-input w-full mt-1" value={partyForm.sortOrder} onChange={(e) => setPartyForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 99 }))} />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setShowAddPartyModal(false)}>Cancel</Button>
              <Button disabled={upsertPartyMutation.isPending || !partyForm.name.trim()} onClick={() => upsertPartyMutation.mutate()}>
                {upsertPartyMutation.isPending ? 'Saving…' : editPartyId ? 'Save Changes' : 'Add Party'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Add/Edit Organiser ──────────────────────────────────────── */}
      {showAddOrganiserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4">
            <h3 className="font-serif text-xl">{editOrganiserId ? 'Edit Organiser' : 'Add New Organiser'}</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name *</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={organiserForm.name}
                  onChange={(e) => setOrganiserForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Designation / Role *</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={organiserForm.designation}
                  onChange={(e) => setOrganiserForm((f) => ({ ...f, designation: e.target.value }))}
                  placeholder="e.g. Convener, Secretary General"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">LinkedIn Profile URL</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={organiserForm.linkedinUrl}
                  onChange={(e) => setOrganiserForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Photograph (Portrait)</label>
                <ImageInput
                  onImageSelect={(b64, name, type) => { setOrganiserPhotoBase64(b64); setOrganiserPhotoName(name); setOrganiserPhotoType(type); }}
                  currentImageUrl={null}
                  className="mt-1"
                />
                {organiserPhotoBase64 && (
                  <img src={`data:${organiserPhotoType};base64,${organiserPhotoBase64}`} alt="preview" className="mt-2 h-16 w-14 object-cover rounded border" />
                )}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Display Order</label>
                  <input
                    type="number"
                    className="yds-search-input w-full mt-1"
                    value={organiserForm.displayOrder}
                    onChange={(e) => setOrganiserForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={organiserForm.isActive}
                      onChange={(e) => setOrganiserForm((f) => ({ ...f, isActive: e.target.checked }))}
                    />
                    <span className="text-sm">Active (show on website)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setShowAddOrganiserModal(false)}>Cancel</Button>
              <Button
                disabled={upsertOrganiserMutation.isPending || !organiserForm.name.trim() || !organiserForm.designation.trim()}
                onClick={() => upsertOrganiserMutation.mutate()}
              >
                {upsertOrganiserMutation.isPending ? 'Saving…' : editOrganiserId ? 'Save Changes' : 'Add Organiser'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Add/Edit Co-Organiser ───────────────────────────────────── */}
      {showAddCoOrganiserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-background border rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 space-y-4">
            <h3 className="font-serif text-xl">{editCoOrganiserId ? 'Edit Co-Organiser' : 'Add New Co-Organiser'}</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Full Name *</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={coOrganiserForm.name}
                  onChange={(e) => setCoOrganiserForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Jane Smith"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Designation / Role *</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={coOrganiserForm.designation}
                  onChange={(e) => setCoOrganiserForm((f) => ({ ...f, designation: e.target.value }))}
                  placeholder="e.g. Logistics Lead, Media Head"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">LinkedIn Profile URL</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={coOrganiserForm.linkedinUrl}
                  onChange={(e) => setCoOrganiserForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Photograph (Portrait)</label>
                <ImageInput
                  onImageSelect={(b64, name, type) => { setCoOrganiserPhotoBase64(b64); setCoOrganiserPhotoName(name); setCoOrganiserPhotoType(type); }}
                  currentImageUrl={null}
                  className="mt-1"
                />
                {coOrganiserPhotoBase64 && (
                  <img src={`data:${coOrganiserPhotoType};base64,${coOrganiserPhotoBase64}`} alt="preview" className="mt-2 h-16 w-14 object-cover rounded border" />
                )}
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Display Order</label>
                  <input
                    type="number"
                    className="yds-search-input w-full mt-1"
                    value={coOrganiserForm.displayOrder}
                    onChange={(e) => setCoOrganiserForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 1 }))}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={coOrganiserForm.isActive}
                      onChange={(e) => setCoOrganiserForm((f) => ({ ...f, isActive: e.target.checked }))}
                    />
                    <span className="text-sm">Active (show on website)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setShowAddCoOrganiserModal(false)}>Cancel</Button>
              <Button
                disabled={upsertCoOrganiserMutation.isPending || !coOrganiserForm.name.trim() || !coOrganiserForm.designation.trim()}
                onClick={() => upsertCoOrganiserMutation.mutate()}
              >
                {upsertCoOrganiserMutation.isPending ? 'Saving…' : editCoOrganiserId ? 'Save Changes' : 'Add Co-Organiser'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Edit Developer Links ────────────────────────────────────── */}
      {showEditDevModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-background border rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 space-y-4">
            <h3 className="font-serif text-xl">Edit Developer Links — {devForm.name}</h3>
            <p className="text-xs text-muted-foreground">Only professional GitHub and LinkedIn profile links are allowed.</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">GitHub Profile URL</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={devForm.githubUrl}
                  onChange={(e) => setDevForm((f) => ({ ...f, githubUrl: e.target.value }))}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">LinkedIn Profile URL</label>
                <input
                  className="yds-search-input w-full mt-1"
                  value={devForm.linkedinUrl}
                  onChange={(e) => setDevForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={() => setShowEditDevModal(false)}>Cancel</Button>
              <Button disabled={upsertDeveloperMutation.isPending} onClick={() => upsertDeveloperMutation.mutate()}>
                {upsertDeveloperMutation.isPending ? 'Saving…' : 'Save Links'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
