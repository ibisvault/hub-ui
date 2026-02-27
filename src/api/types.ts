// ── Auth ────────────────────────────────────────────────────────────
export interface AuthRequest {
  user_id: string;
  pin: string;
  claim?: boolean;
  hub_url?: string;
}

export interface AuthResponse {
  token: string;
}

// ── Pagination ──────────────────────────────────────────────────────
export interface Pager {
  size: number;
  offset: number;
}

// ── Users ───────────────────────────────────────────────────────────
export interface AppUser {
  user_id: string;
  fname?: string;
  lname?: string;
  mname?: string;
  email_id: string;
  enabled: boolean;
  is_admin: boolean;
  group_id: number;
  failed_logins?: number;
  role_id: number;
  create_date: string;
  update_date: string;
}

export interface CreateAppUser {
  user_id: string;
  pin: string;
  fname?: string;
  lname?: string;
  mname?: string;
  email_id: string;
  enabled: boolean;
  is_admin: boolean;
  group_id: number;
  role_id: number;
}

export interface UpdatePassword {
  user_id: string;
  old_password: string;
  new_password: string;
}

// ── Roles ───────────────────────────────────────────────────────────
export interface AppRole {
  id: number;
  name: string;
  description?: string;
  admin_flag: boolean;
  create_date: string;
  update_date: string;
}

export interface CreateAppRole {
  name: string;
  description?: string;
  admin_flag: boolean;
}

export interface UpdateAppRole {
  name: string;
  description?: string;
  admin_flag: boolean;
}

// ── Groups ──────────────────────────────────────────────────────────
export interface Group {
  id: number;
  name: string;
  description?: string;
  create_date: string;
  update_date: string;
}

export interface GroupUpdate {
  name: string;
  description?: string;
}

// ── CAN Types ───────────────────────────────────────────────────────
export interface CanType {
  id: number;
  name: string;
  description: string;
  docker_image: string;
  config?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface CreateCanType {
  name: string;
  description: string;
  docker_image: string;
}

// ── CAN Instances ───────────────────────────────────────────────────
export interface CanInstance {
  id: number;
  can_type_id: number;
  name: string;
  description: string;
  config?: Record<string, unknown>;
  storage_path: string;
  input_path: string;
  retention_days: number;
  retention_flag: boolean;
  token: string;
  ae_title?: string;
  dcmnet_port?: number;
  remote_ip?: string;
  created_at: string;
  updated_at: string;
  assigned_userid?: string;
}

export interface CreateCanInstance {
  can_type_id: number;
  name: string;
  description: string;
  ip?: string;
  port?: number;
  ae_title?: string;
  dcmnet_port?: number;
  config?: Record<string, unknown>;
  storage_path: string;
  input_path: string;
  retention_days?: number;
  retention_flag?: boolean;
}

export interface UpdateCanInstance {
  description?: string;
  storage_path?: string;
  input_path?: string;
  retention_flag?: boolean;
  retention_days?: number;
  ip?: string;
  port?: number;
  ae_title?: string;
  dcmnet_port?: number;
}

// ── DICOM Listener ──────────────────────────────────────────────────
export interface DicomListener {
  ae_title: string;
  port: number;
  [key: string]: unknown;
}

// ── Workstations ────────────────────────────────────────────────────
export interface Workstation {
  id: number;
  name: string;
  description?: string;
  ae_title: string;
  can_inst_id: number;
  ip: string;
  port: number;
}

export interface UpdateWorkstation {
  name: string;
  description?: string;
  ae_title: string;
  ip: string;
  port: number;
}

// ── Routing Rules ───────────────────────────────────────────────────
export interface RouterRule {
  id: number;
  name: string;
  description?: string;
  can_inst_id: number;
  conditions?: Record<string, unknown>;
  post_processing?: Record<string, unknown>;
  source_workstation_id: number;
  destination_workstation_id?: number;
}

export interface RouterRuleForUpdate {
  name?: string;
  description?: string;
  conditions?: Record<string, unknown>;
  post_processing?: Record<string, unknown>;
  source_workstation_id?: number;
  destination_workstation_id?: number;
}

// ── Jobs ────────────────────────────────────────────────────────────
export interface Job {
  id: number;
  name: string;
  description: string;
  can_inst_id: number;
  job_type_id?: number;
  job_schedule_id?: number;
  status?: string;
  params: Record<string, unknown>;
  function: string;
  create_date: string;
  update_date: string;
}

export interface CreateJob {
  name: string;
  description: string;
  function: string;
  can_inst_id: number;
  job_type_id: number;
  params: Record<string, unknown>;
}

export interface JobFilter {
  can_inst_id?: number;
  job_type_id?: number;
  interval?: string;
  pager: Pager;
}

// ── Job Types ───────────────────────────────────────────────────────
export interface JobType {
  id: number;
  name: string;
  description?: string;
  function: string;
  create_date: string;
  update_date: string;
}

export interface CreateJobType {
  name: string;
  description?: string;
  function: string;
}

export interface UpdateJobType {
  name: string;
  description?: string;
}

// ── Job Schedules ───────────────────────────────────────────────────
export interface JobSchedule {
  id: number;
  job_type_id?: number;
  name: string;
  minutes?: number;
  time_of_day?: number;
  params?: Record<string, unknown>;
  enabled?: boolean;
  create_date: string;
  creator_userid: string;
  update_date: string;
  updator_userid: string;
}

export interface CreateJobSchedule {
  name: string;
  job_type_id?: number;
  minutes?: number;
  params?: Record<string, unknown>;
  doc_id: number;
  can_inst_id: number;
}

// ── Tasks ───────────────────────────────────────────────────────────
export interface Task {
  id: number;
  job_id?: number;
  name: string;
  cmd: string;
  can_inst_id: number;
  task_type: string;
  status: string;
  stdout?: string;
  stderr?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  return_code?: number;
  create_date: string;
  update_date: string;
}

export interface TaskSummary {
  job_id: number;
  name: string;
  can_inst_id: number;
  total_tasks: number;
  completed_tasks: number;
  queued_tasks: number;
  pending_tasks: number;
  error_tasks: number;
  task_start_date: string;
  task_end_date: string;
}

export interface CreateTask {
  name: string;
  cmd: string;
  can_inst_id: number;
  task_type: string;
  status: string;
  params: Record<string, unknown>;
  job_id?: number;
}

export interface TaskFilter {
  can_inst_id?: number;
  task_type?: string;
  status?: string;
  interval?: string;
  job_id?: number;
  pager: Pager;
  params?: Array<{ key: string; value: string }>;
  order_by?: string;
}

// ── Commands ────────────────────────────────────────────────────────
export interface Command {
  id: string;
  name: string;
  args: string[];
  can_inst_id: number;
  status: string;
  created_at: string;
}

export interface CreateCommand {
  name: string;
  args: string[];
  can_inst_id: number;
}

export interface CommandResult {
  command_id: string;
  status: string;
  return_code: number;
  stdout: string;
  stderr: string;
  completed_at: string;
}

// ── Documents ───────────────────────────────────────────────────────
export interface DocumentMeta {
  id: number;
  name: string;
  doc_type: string;
  description?: string;
  create_date: string;
  creator_userid: string;
  update_date: string;
  updator_userid: string;
}

export interface DocumentContent extends DocumentMeta {
  json_doc?: Record<string, unknown>;
  text_doc?: string;
}

export interface CreateDocument {
  name: string;
  doc_type: string;
  description?: string;
  json_doc?: Record<string, unknown>;
  text_doc?: string;
}

// ── Notifications ───────────────────────────────────────────────────
export interface Notification {
  id: number;
  user_id: string;
  notification_type: string;
  source: string;
  message: string;
  metadata?: Record<string, unknown>;
  is_sent: boolean;
  read_at?: string;
  create_date: string;
}

export interface CreateNotification {
  user_id: string;
  notification_type: string;
  source: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationFilters {
  user_id?: string;
  notification_type?: string;
  source?: string;
  is_read?: boolean;
  is_sent?: boolean;
  limit?: number;
  offset?: number;
}

export interface NotificationCount {
  total: number;
  unread: number;
  by_type: Record<string, number>;
}

// ── I/O Targets ─────────────────────────────────────────────────────
export interface IOTarget {
  id: number;
  name: string;
  description: string;
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_region: string;
  aws_bucket: string;
  bucket_path_prefix: string;
}

export interface IOTargetForUpdate {
  name: string;
  description: string;
  aws_access_key_id: string;
  aws_secret_access_key: string;
}

// ── DCM Targets ─────────────────────────────────────────────────────
export interface DcmTarget {
  id: number;
  name: string;
  description: string;
  can_id: number;
  input_folder: string;
  is_public: boolean;
}

export interface DcmTargetForUpdate {
  name?: string;
  description?: string;
  input_folder?: string;
}

// ── Menu Routes ─────────────────────────────────────────────────────
export interface MenuRoute {
  id: number;
  parent_id?: number;
  name: string;
  service: string;
  path: string;
  icon?: string;
  params?: Record<string, unknown>;
}

export interface CreateMenuRoute {
  parent_id?: number;
  name: string;
  service: string;
  path: string;
  icon?: string;
  params?: Record<string, unknown>;
}

export interface UpdateMenuRoute {
  name: string;
  service: string;
  path: string;
  icon?: string;
  parent_id?: number;
}

// ── ECR ─────────────────────────────────────────────────────────────
export interface UpdateEcrCredentials {
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_region: string;
}
