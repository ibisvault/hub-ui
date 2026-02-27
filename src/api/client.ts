import type {
  AuthRequest,
  AuthResponse,
  AppUser,
  CreateAppUser,
  UpdatePassword,
  AppRole,
  CreateAppRole,
  UpdateAppRole,
  Group,
  GroupUpdate,
  CanType,
  CreateCanType,
  CanInstance,
  CreateCanInstance,
  UpdateCanInstance,
  DicomListener,
  Workstation,
  UpdateWorkstation,
  RouterRule,
  RouterRuleForUpdate,
  Job,
  CreateJob,
  JobFilter,
  JobType,
  CreateJobType,
  UpdateJobType,
  JobSchedule,
  CreateJobSchedule,
  Task,
  TaskSummary,
  CreateTask,
  TaskFilter,
  Command,
  CreateCommand,
  CommandResult,
  DocumentMeta,
  DocumentContent,
  CreateDocument,
  Notification,
  CreateNotification,
  NotificationFilters,
  NotificationCount,
  IOTarget,
  IOTargetForUpdate,
  DcmTarget,
  DcmTargetForUpdate,
  MenuRoute,
  CreateMenuRoute,
  UpdateMenuRoute,
  UpdateEcrCredentials,
} from "./types";

class RhubClient {
  private baseUrl: string;

  constructor(baseUrl = "/rhub") {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    return sessionStorage.getItem("auth_token");
  }

  private headers(extra: Record<string, string> = {}): Record<string, string> {
    const h: Record<string, string> = { "Content-Type": "application/json", ...extra };
    const token = this.getToken();
    if (token) h["X-API-KEY"] = token;
    return h;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: { ...this.headers(), ...(init.headers as Record<string, string> || {}) },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`${res.status} ${res.statusText}: ${body}`);
    }
    if (res.status === 204) return undefined as T;
    return res.json();
  }

  private get<T>(path: string) {
    return this.request<T>(path);
  }

  private post<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: "POST", body: body != null ? JSON.stringify(body) : undefined });
  }

  private patch<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: "PATCH", body: body != null ? JSON.stringify(body) : undefined });
  }

  private put<T>(path: string, body?: unknown) {
    return this.request<T>(path, { method: "PUT", body: body != null ? JSON.stringify(body) : undefined });
  }

  private del<T>(path: string) {
    return this.request<T>(path, { method: "DELETE" });
  }

  // ── System ──────────────────────────────────────────────────────────
  ping() { return this.get<{ ping: string }>("/ping"); }
  getEnv() { return this.get<Record<string, string>>("/env"); }
  restart() { return this.get<string>("/restart"); }

  // ── Auth ────────────────────────────────────────────────────────────
  authenticate(req: AuthRequest) { return this.post<AuthResponse>("/auth", req); }

  // ── CAN Types ─────────────────────────────────────────────────────
  listCanTypes() { return this.get<CanType[]>("/can_types"); }
  getCanType(id: number) { return this.get<CanType>(`/can_types/${id}`); }
  createCanType(dto: CreateCanType) { return this.post<CanType>("/can_types", dto); }
  listCanInstancesForType(typeId: number) { return this.get<CanInstance[]>(`/can_types/${typeId}/cans`); }
  listInstallerAssetsForType(typeId: number) { return this.get<unknown[]>(`/can_types/${typeId}/installer/assets`); }

  // ── CAN Instances ─────────────────────────────────────────────────
  listCanInstances() { return this.get<CanInstance[]>("/cans"); }
  getCanInstance(id: number) { return this.get<CanInstance>(`/cans/${id}`); }
  createCanInstance(dto: CreateCanInstance) { return this.post<CanInstance>("/cans", dto); }
  updateCanInstance(id: number, dto: UpdateCanInstance) { return this.patch<CanInstance>(`/cans/${id}`, dto); }
  deleteCanInstance(id: number) { return this.del<void>(`/cans/${id}`); }
  getActiveCanInstances() { return this.get<CanInstance[]>("/cans/active"); }
  isCanAlive(id: number) { return this.get<unknown>(`/cans/${id}/alive`); }
  getCanHealth(id: number) { return this.get<unknown>(`/cans/${id}/health`); }
  getInstallerToken(id: number, params?: string) { return this.get<unknown>(`/cans/${id}/installer-token${params ? `?${params}` : ""}`); }
  listInstallerAssets(id: number) { return this.get<unknown[]>(`/cans/${id}/installer/assets`); }
  downloadInstallerAsset(id: number, params: string) { return this.get<unknown>(`/cans/${id}/installer/assets/download?${params}`); }
  deleteTasksForCan(id: number) { return this.del<void>(`/cans/${id}/tasks`); }

  // ── DICOM Listener ────────────────────────────────────────────────
  getDicomListener(canId: number) { return this.get<DicomListener>(`/cans/${canId}/dicom-listener`); }
  updateDicomListener(canId: number, dto: DicomListener) { return this.patch<DicomListener>(`/cans/${canId}/dicom-listener`, dto); }

  // ── Workstations (per CAN) ────────────────────────────────────────
  listWorkstationsForCan(canId: number) { return this.get<Workstation[]>(`/cans/${canId}/workstations`); }
  createWorkstationForCan(canId: number, dto: UpdateWorkstation) { return this.post<Workstation>(`/cans/${canId}/workstations`, dto); }
  deleteWorkstationsForCan(canId: number) { return this.del<void>(`/cans/${canId}/workstations`); }
  getWorkstation(canId: number, wsId: number) { return this.get<Workstation>(`/cans/${canId}/workstations/${wsId}`); }
  updateWorkstation(canId: number, wsId: number, dto: UpdateWorkstation) { return this.patch<Workstation>(`/cans/${canId}/workstations/${wsId}`, dto); }
  deleteWorkstation(canId: number, wsId: number) { return this.del<void>(`/cans/${canId}/workstations/${wsId}`); }

  // ── Workstations (global) ─────────────────────────────────────────
  listWorkstations() { return this.get<Workstation[]>("/workstations"); }

  // ── Routing Rules ─────────────────────────────────────────────────
  listRoutingRules(canId: number) { return this.get<RouterRule[]>(`/cans/${canId}/routing-rules`); }
  getRoutingRule(canId: number, ruleId: number) { return this.get<RouterRule>(`/cans/${canId}/routing-rules/${ruleId}`); }
  createRoutingRule(canId: number, dto: RouterRuleForUpdate) { return this.post<RouterRule>(`/cans/${canId}/routing-rules`, dto); }
  updateRoutingRule(canId: number, ruleId: number, dto: RouterRuleForUpdate) { return this.patch<RouterRule>(`/cans/${canId}/routing-rules/${ruleId}`, dto); }
  deleteRoutingRule(canId: number, ruleId: number) { return this.del<void>(`/cans/${canId}/routing-rules/${ruleId}`); }
  clearRoutingRules(canId: number) { return this.del<void>(`/cans/${canId}/routing-rules`); }

  // ── Jobs ──────────────────────────────────────────────────────────
  listJobs(filter: JobFilter) { return this.post<Job[]>("/jobs/list", filter); }
  getJob(id: number) { return this.get<Job>(`/jobs/${id}`); }
  getJobByName(name: string) { return this.get<Job>(`/jobs/name/${name}`); }
  createJob(dto: CreateJob) { return this.post<Job>("/jobs", dto); }
  listJobTasks(jobId: number) { return this.get<Task[]>(`/jobs/${jobId}/tasks`); }
  deleteJob(id: number) { return this.del<void>(`/jobs/${id}`); }

  // ── Job Types ─────────────────────────────────────────────────────
  listJobTypes() { return this.get<JobType[]>("/job_types"); }
  getJobType(id: number) { return this.get<JobType>(`/job_types/${id}`); }
  getJobTypeByName(name: string) { return this.get<JobType>(`/job_types/name/${name}`); }
  createJobType(dto: CreateJobType) { return this.post<JobType>("/job_types", dto); }
  updateJobType(id: number, dto: UpdateJobType) { return this.patch<JobType>(`/job_types/${id}`, dto); }

  // ── Job Schedules ─────────────────────────────────────────────────
  listJobSchedules() { return this.get<JobSchedule[]>("/schedules"); }
  getJobSchedule(id: number) { return this.get<JobSchedule>(`/schedules/${id}`); }
  createJobSchedule(dto: CreateJobSchedule) { return this.post<JobSchedule>("/schedules", dto); }
  listJobsForSchedule(scheduleId: number) { return this.get<Job[]>(`/schedules/${scheduleId}/jobs`); }

  // ── Tasks ─────────────────────────────────────────────────────────
  queryTasks(filter: TaskFilter) { return this.post<Task[]>("/tasks/query-tasks", filter); }
  getTask(id: number) { return this.get<Task>(`/tasks/${id}`); }
  createTask(dto: CreateTask) { return this.post<Task>("/tasks", dto); }
  updateTask(id: number, dto: unknown) { return this.post<Task>(`/tasks/${id}`, dto); }
  deleteTask(id: number) { return this.del<void>(`/tasks/${id}`); }
  getTaskSummary(filter: TaskFilter) { return this.post<TaskSummary[]>("/tasks/summary", filter); }
  getTaskSummaryCount(filter: TaskFilter) { return this.post<number>("/tasks/summary/count", filter); }
  updateTaskStatus(id: number, newStatus: string) { return this.patch<void>(`/tasks/${id}/${newStatus}`); }
  createQueryRetrieveTasks(dto: unknown) { return this.post<unknown>("/tasks/create-query-retrieve-tasks", dto); }

  // ── Commands ──────────────────────────────────────────────────────
  createCommand(dto: CreateCommand) { return this.post<Command>("/commands", dto); }
  getCommand(id: string) { return this.get<Command>(`/commands/${id}`); }
  getCommandsForCan(canInstId: number) { return this.get<Command[]>(`/commands/can/${canInstId}`); }
  getCommandResult(id: string) { return this.get<CommandResult>(`/commands/${id}/result`); }

  // ── Documents ─────────────────────────────────────────────────────
  listDocuments(params?: { doc_type?: string; name_like?: string }) {
    const qs = new URLSearchParams();
    if (params?.doc_type) qs.set("doc_type", params.doc_type);
    if (params?.name_like) qs.set("name_like", params.name_like);
    const q = qs.toString();
    return this.get<DocumentMeta[]>(`/documents${q ? `?${q}` : ""}`);
  }
  getDocument(id: number) { return this.get<DocumentContent>(`/documents/${id}`); }
  getDocumentByName(name: string) { return this.get<DocumentContent>(`/documents/name/${name}`); }
  searchDocuments(params: string) { return this.get<DocumentMeta[]>(`/documents/search?${params}`); }
  createDocument(dto: CreateDocument) { return this.post<DocumentContent>("/documents", dto); }
  deleteDocument(id: number) { return this.del<void>(`/documents/${id}`); }
  getCmoveDocuments() { return this.get<DocumentContent[]>("/documents/cmove"); }

  // ── Notifications ─────────────────────────────────────────────────
  listNotifications(filters?: NotificationFilters) {
    const qs = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => { if (v != null) qs.set(k, String(v)); });
    }
    const q = qs.toString();
    return this.get<Notification[]>(`/notifications${q ? `?${q}` : ""}`);
  }
  getNotification(id: number) { return this.get<Notification>(`/notifications/${id}`); }
  createNotification(dto: CreateNotification) { return this.post<Notification>("/notifications", dto); }
  deleteNotification(id: number) { return this.del<void>(`/notifications/${id}`); }
  markNotificationRead(id: number) { return this.put<void>(`/notifications/${id}/read`); }
  getNotificationCounts() { return this.get<NotificationCount>("/notifications/counts"); }
  markNotificationsRead(ids: number[]) { return this.put<void>("/notifications/read", { ids }); }
  markAllNotificationsRead(userId: string) { return this.put<void>("/notifications/read/all", { user_id: userId }); }
  markNotificationsSent(ids: number[]) { return this.put<void>("/notifications/sent", { ids }); }
  deleteAllNotifications(userId: string) { return this.del<void>(`/notifications/all?user_id=${userId}`); }

  // ── Users ─────────────────────────────────────────────────────────
  listUsers() { return this.get<AppUser[]>("/users"); }
  getUser(id: string) { return this.get<AppUser>(`/users/${id}`); }
  createUser(dto: CreateAppUser) { return this.post<AppUser>("/users", dto); }
  updateUser(dto: Partial<AppUser>) { return this.patch<AppUser>("/users", dto); }
  updatePassword(dto: UpdatePassword) { return this.patch<void>("/users/update-password", dto); }
  toggleUserStatus(userId: string) { return this.patch<void>(`/users/toggle-status/${userId}`); }

  // ── Roles ─────────────────────────────────────────────────────────
  listRoles() { return this.get<AppRole[]>("/roles"); }
  getRole(id: number) { return this.get<AppRole>(`/roles/${id}`); }
  createRole(dto: CreateAppRole) { return this.post<AppRole>("/roles", dto); }
  updateRole(id: number, dto: UpdateAppRole) { return this.patch<AppRole>(`/roles/${id}`, dto); }
  assignMenuRoute(roleId: number, routeId: number) { return this.post<void>(`/roles/${roleId}/menu_routes/${routeId}`); }
  unassignMenuRoute(roleId: number, routeId: number) { return this.del<void>(`/roles/${roleId}/menu_routes/${routeId}`); }

  // ── Groups ────────────────────────────────────────────────────────
  listGroups() { return this.get<Group[]>("/groups"); }
  getGroup(id: number) { return this.get<Group>(`/groups/${id}`); }
  createGroup(dto: GroupUpdate) { return this.post<Group>("/groups", dto); }
  updateGroup(id: number, dto: GroupUpdate) { return this.patch<Group>(`/groups/${id}`, dto); }

  // ── Menu Routes ───────────────────────────────────────────────────
  listMenuRoutes() { return this.get<MenuRoute[]>("/menu_routes"); }
  getMenuRoute(id: number) { return this.get<MenuRoute>(`/menu_routes/${id}`); }
  createMenuRoute(dto: CreateMenuRoute) { return this.post<MenuRoute>("/menu_routes", dto); }
  updateMenuRoute(id: number, dto: UpdateMenuRoute) { return this.patch<MenuRoute>(`/menu_routes/${id}`, dto); }
  deleteMenuRoute(id: number) { return this.del<void>(`/menu_routes/${id}`); }
  listRoleMenuRoutes(roleId: number) { return this.get<MenuRoute[]>(`/menu_routes/role/${roleId}`); }

  // ── I/O Targets ───────────────────────────────────────────────────
  listIOTargets() { return this.get<IOTarget[]>("/io-targets"); }
  getIOTarget(id: number) { return this.get<IOTarget>(`/io-targets/${id}`); }
  createIOTarget(dto: IOTarget) { return this.post<IOTarget>("/io-targets", dto); }
  updateIOTarget(id: number, dto: IOTargetForUpdate) { return this.patch<IOTarget>(`/io-targets/${id}`, dto); }
  deleteIOTarget(id: number) { return this.del<void>(`/io-targets/${id}`); }

  // ── DCM Targets ───────────────────────────────────────────────────
  listDcmTargets() { return this.get<DcmTarget[]>("/dcm-targets"); }
  getDcmTarget(id: number) { return this.get<DcmTarget>(`/dcm-targets/${id}`); }
  updateDcmTarget(id: number, dto: DcmTargetForUpdate) { return this.patch<DcmTarget>(`/dcm-targets/${id}`, dto); }

  // ── ECR ───────────────────────────────────────────────────────────
  getEcrCredentials() { return this.get<unknown>("/ecr"); }
  createOrUpdateEcrCredentials(dto: UpdateEcrCredentials) { return this.post<unknown>("/ecr", dto); }
  deleteEcrCredentials() { return this.del<void>("/ecr"); }

  // ── Redis ─────────────────────────────────────────────────────────
  getRedisKeys() { return this.get<string[]>("/rds/keys"); }
  getRedisKey(key: string) { return this.get<unknown>(`/rds/keys/${key}`); }

  // ── R3 (Object Storage) ───────────────────────────────────────────
  listR3Folders() { return this.get<unknown[]>("/r3/folders"); }
  listR3Files(params?: string) { return this.get<unknown[]>(`/r3/files${params ? `?${params}` : ""}`); }

  // ── Scripts ───────────────────────────────────────────────────────
  listScripts() { return this.get<unknown[]>("/scripts"); }
  getScript(name: string) { return this.get<unknown>(`/scripts/${name}`); }
  downloadScripts() { return this.get<unknown>("/scripts/download"); }
}

export const rhub = new RhubClient();
export default RhubClient;
