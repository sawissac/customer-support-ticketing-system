export interface TicketApiResponse {
  id: number;
  tickets_id: string;
  customer_project_id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  drive_link: string;
  admin_id: number;
  employee_report: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}
