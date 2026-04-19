# Software Requirements Specification (SRS)

## Project Title

Multi-Tenant SaaS Platform for Online Doctor Appointment, Chamber Management, E-Prescription, Medical Records, and Patient Relationship Management

## Version

1.0

## Prepared For

Product Owner / Founding Team

## Prepared By

Technical Project Planner

## 1. Introduction

### 1.1 Purpose

This document defines the software requirements for a multi-tenant SaaS-based web application that enables private doctors and clinics to manage chamber operations online. The platform will support appointment booking, patient records, prescriptions, payment history, disease and treatment history, medical report uploads, document printing, dashboards, and role-based access control.

The system will be built using:

* **Frontend:** Next.js
* **Backend / API / Admin logic:** Laravel PHP
* **Deployment Model:** SaaS, multi-tenant architecture

### 1.2 Intended Audience

* Product owner / founders
* Business analysts
* UI/UX designers
* Solution architects
* Backend developers
* Frontend developers
* QA engineers
* DevOps engineers
* Security and compliance stakeholders

### 1.3 Product Scope

The application will allow doctors to register as SaaS tenants and manage their individual chambers digitally. Each doctor or chamber operates in an isolated tenant space with separate data access. Patients can register, book appointments, view prescriptions, upload/download medical reports, and access their treatment history. Platform administrators can manage SaaS subscriptions, compliance, tenant onboarding, and system-wide monitoring.

The platform is intended for:

* Independent private doctors
* Small clinics / chambers
* Multi-doctor chamber setups (future-ready)
* Patients booking and managing appointments online

### 1.4 Business Goals

* Digitize private chamber management
* Enable doctors to run chamber operations with less paperwork
* Offer a subscription-based SaaS model
* Improve patient experience through online booking and record access
* Centralize prescriptions, reports, and treatment history
* Provide analytics and business visibility to doctors
* Support printing and digital document management

### 1.5 Definitions and Terminology

* **Tenant:** A doctor or clinic account with logically isolated data within the SaaS platform.
* **Chamber/Camber:** A doctor’s practice location or consultation unit. This SRS uses **Chamber** as the standard term.
* **RBAC:** Role-Based Access Control.
* **SaaS:** Software as a Service.
* **Prescription:** Doctor-issued medication and treatment instruction document.
* **Encounter/Visit:** A completed consultation session tied to an appointment.
* **Medical Report:** Uploaded lab report, scan, test result, or external diagnosis document.
* **Platform Admin:** Super admin operating the full SaaS system.
* **Tenant Admin:** Doctor or designated chamber admin who manages one tenant.

### 1.6 Assumptions

* Initial version is a web application optimized for desktop and mobile browsers.
* Laravel will expose secure APIs consumed by the Next.js frontend.
* Multi-tenant isolation will be enforced at application and database query levels.
* Payment gateway integration will be configurable per region.
* Printing will be browser-based PDF or printable HTML.
* SMS, email, and WhatsApp-style notifications may be integrated through third-party providers.
* Compliance requirements vary by country and will need localization before launch in regulated markets.

### 1.7 Constraints

* Initial release should prioritize MVP features for appointment, prescription, patient records, and subscription billing.
* Sensitive health information requires strong access control, audit logs, encryption, and backup strategy.
* Multi-tenant design must support future scaling to thousands of doctors.

---

## 2. System Overview

### 2.1 Product Perspective

This system is a new cloud-hosted SaaS platform consisting of:

* Public marketing and onboarding site
* Platform Admin Portal
* Tenant Doctor/Chamber Portal
* Patient Portal
* Shared backend API and services
* File storage for reports, prescriptions, and images
* Analytics and reporting engine
* Notification service
* Subscription and billing service

### 2.2 Major User Groups

1. **Platform Super Admin**
2. **Doctor / Tenant Owner**
3. **Chamber Staff / Receptionist / Assistant**
4. **Patient**
5. **Accountant / Billing Staff**
6. **Support / Compliance Auditor**

### 2.3 High-Level Capabilities

* SaaS tenant registration and provisioning
* Chamber creation and configuration
* Patient registration and profile management
* Appointment scheduling and queue management
* Prescription management
* Disease, diagnosis, treatment, and visit history
* Medical reports and image upload storage
* Payment history and invoice management
* Dashboard and data visualization
* Secure role-based document access
* Print/download prescriptions, invoices, and reports
* Audit logs and subscription management

---

## 3. Proposed Feature Expansion

In addition to the features explicitly requested, the following features are recommended to make the product stronger and more commercially viable:

1. **Online Payment Collection** for appointment booking and consultation fees.
2. **Doctor Availability Management** by date, slot, leave, and chamber.
3. **Queue / Token Management** for in-person patient flow.
4. **Teleconsultation Readiness** with meeting links and visit notes.
5. **Follow-Up Scheduling** linked to prescriptions and treatment plans.
6. **Automated Reminders** via SMS/email/app notification.
7. **Custom Prescription Templates** with branding and signature.
8. **Medical Certificate Generation** for patients.
9. **Tenant Subscription Billing** with plan features and usage limits.
10. **Advanced Search and Filters** across records and reports.
11. **Analytics Dashboard** showing revenue, appointments, patient trends, common diseases.
12. **Patient Timeline View** across all appointments, diagnoses, prescriptions, and files.
13. **Consent and Privacy Controls** for data visibility and report sharing.
14. **Audit Trail** for every critical data change.
15. **Import/Export Features** for patient data, reports, and billing summaries.
16. **Multi-Chamber Support** for doctors practicing at multiple locations.
17. **Staff Role Management** under each doctor’s tenant.
18. **Document Numbering / Invoice Numbering** per tenant.
19. **Retention and Archival Rules** for old records.
20. **AI-ready notes structuring** for future smart summaries or coding suggestions.

---

## 4. Stakeholders and User Roles

### 4.1 Platform Roles

#### 4.1.1 Super Admin

* Manage all tenants
* Manage platform-wide subscriptions
* View tenant usage metrics
* Configure plans, commissions, taxes, and payment gateways
* Suspend/reactivate tenants
* Manage support tickets and compliance logs
* View system audit reports

#### 4.1.2 Support Admin

* Assist with onboarding and support tickets
* Limited access to tenant metadata only
* No direct access to sensitive medical records unless explicitly authorized and audited

### 4.2 Tenant Roles

#### 4.2.1 Doctor / Tenant Owner

* Manage chamber profile and settings
* Manage staff users and permissions
* Configure availability and appointment slots
* View and manage patients, prescriptions, payments, reports
* View analytics and financial summaries
* Print/download medical documents

#### 4.2.2 Receptionist / Assistant

* Create and update appointments
* Register walk-in patients
* Manage queue/token
* Upload reports if authorized
* Collect payments if authorized
* View patient schedule-related information based on permissions

#### 4.2.3 Accountant / Billing Staff

* View billing records
* Create receipts, invoices, refund records
* Reconcile consultation payments
* Generate financial reports based on access rights

### 4.3 Patient Role

#### 4.3.1 Patient

* Register/login securely
* Search/select doctor or chamber
* Book/cancel/reschedule appointments
* Pay online if enabled
* View appointment history
* View prescriptions and treatment history allowed by doctor
* Upload pre-visit or post-visit medical reports
* Download printable prescriptions and invoices

---

## 5. Functional Requirements

### 5.1 Tenant Onboarding and SaaS Management

#### FR-001 Tenant Registration

The system shall allow doctors or clinics to sign up as a new tenant.

#### FR-002 Tenant Provisioning

The system shall automatically create a tenant workspace after registration and successful verification/payment.

#### FR-003 Subscription Plan Selection

The system shall allow tenants to select SaaS plans during or after onboarding.

#### FR-004 Plan Limits

The system shall enforce subscription-based limits such as number of users, chambers, storage, appointments, or premium modules.

#### FR-005 Trial Support

The system shall support free trial periods for new tenants.

#### FR-006 Tenant Status Control

Platform admin shall be able to activate, suspend, or deactivate tenant accounts.

#### FR-007 Billing and Renewal

The system shall track subscription renewal dates, invoices, payment status, and reminders.

### 5.2 Authentication and Access Control

#### FR-008 User Authentication

The system shall support secure login for platform admins, tenant users, and patients.

#### FR-009 Password Recovery

The system shall allow password reset via verified email or phone-based OTP.

#### FR-010 Multi-Factor Authentication

The system should support optional MFA for admins and doctors.

#### FR-011 Role-Based Access Control

The system shall restrict access to modules, records, actions, and document types based on role and permission.

#### FR-012 Tenant Isolation

The system shall ensure that a tenant user can access only data belonging to their own tenant.

#### FR-013 Session Management

The system shall allow users to log out, invalidate sessions, and optionally view active sessions.

### 5.3 Doctor/Chamber Profile Management

#### FR-014 Doctor Profile

The system shall allow the doctor to manage profile details such as name, specialty, qualifications, registration number, contact info, profile image, signature, and consultation fee.

#### FR-015 Chamber Profile

The system shall allow each tenant to configure one or more chambers with address, timings, room details, contact numbers, and map/location details.

#### FR-016 Branding Configuration

The system shall allow tenant branding on prescription, invoice, and print templates.

#### FR-017 Working Schedule

The system shall allow doctors to configure weekly schedules, exceptions, holidays, leaves, and blocked slots.

### 5.4 Patient Management

#### FR-018 Patient Registration

The system shall allow staff or patients to create a patient profile.

#### FR-019 Patient Unique Identifier

The system shall generate a unique patient identifier per tenant.

#### FR-020 Patient Profile Data

The system shall store patient name, age, gender, DOB, phone, email, address, blood group, allergies, emergency contact, and basic demographics.

#### FR-021 Medical Summary

The system shall maintain a quick patient summary including chronic conditions, allergies, ongoing medications, and risk flags.

#### FR-022 Patient Search

The system shall support searching patients by name, phone, ID, diagnosis, date range, or visit history.

#### FR-023 Patient Merge/De-duplication

Authorized users should be able to merge duplicate patient records with audit tracking.

### 5.5 Appointment and Queue Management

#### FR-024 Appointment Booking

The system shall allow patients and staff to book appointments based on doctor availability.

#### FR-025 Appointment Types

The system shall support new visit, follow-up visit, teleconsultation, emergency/manual booking, and walk-in appointment types.

#### FR-026 Slot Management

The system shall support configurable consultation slot duration and daily patient limits.

#### FR-027 Reschedule and Cancellation

The system shall allow authorized users to reschedule or cancel appointments with reason capture.

#### FR-028 Queue / Token Management

The system shall support token generation and current queue status for chamber visits.

#### FR-029 Appointment Status

The system shall support statuses such as booked, confirmed, checked-in, in-queue, in-consultation, completed, cancelled, no-show, and refunded.

#### FR-030 Reminder Notifications

The system shall send appointment reminders and status updates through configured channels.

#### FR-031 Calendar View

The system shall provide daily, weekly, and monthly appointment calendars.

### 5.6 Consultation, Disease, and Treatment History

#### FR-032 Encounter Creation

The system shall create a consultation encounter linked to an appointment.

#### FR-033 Chief Complaint Capture

The system shall allow doctors to record the patient’s complaints and symptoms.

#### FR-034 Clinical Notes

The system shall allow notes for diagnosis, observations, advice, and follow-up instructions.

#### FR-035 Diagnosis Management

The system shall store one or more diagnoses per encounter.

#### FR-036 Treatment Plan

The system shall store medicines, dosage, tests, procedures, advice, and follow-up plan.

#### FR-037 Disease History

The system shall maintain longitudinal disease and treatment history across all visits.

#### FR-038 Visit Timeline

The system shall display a patient timeline containing appointments, prescriptions, diagnoses, files, and payments.

#### FR-039 Medical Flags

The system shall allow doctors to tag patients with risk indicators such as diabetic, hypertensive, pregnant, allergy, or critical follow-up.

### 5.7 Prescription Management

#### FR-040 Prescription Creation

The system shall allow doctors to create digital prescriptions linked to encounters.

#### FR-041 Prescription Templates

The system shall support reusable templates for common prescriptions and advice.

#### FR-042 Medicine Instructions

The system shall record medicine name, dosage, frequency, duration, route, and notes.

#### FR-043 Printable Prescription

The system shall provide print-friendly prescription layouts with branding, signature, and QR/reference code.

#### FR-044 Prescription History

The system shall maintain prescription history for each patient.

#### FR-045 Prescription Revision

The system shall allow amendment/versioning of prescriptions with audit log.

### 5.8 Medical Reports and Document Management

#### FR-046 Report Upload

The system shall allow uploading medical reports, images, scans, and supporting files.

#### FR-047 File Type Support

The system shall support image, PDF, and common document formats according to system policy.

#### FR-048 Report Categorization

The system shall categorize reports such as lab test, imaging, discharge paper, referral note, prescription scan, insurance document, and miscellaneous.

#### FR-049 Secure Storage

The system shall store uploaded files securely with tenant-level segregation.

#### FR-050 Document Preview

The system shall allow viewing supported image/PDF files in-browser.

#### FR-051 Download and Print

Authorized users shall be able to download and print files and generated documents.

#### FR-052 File Metadata

The system shall store document title, category, date, uploader, patient link, encounter link, and optional notes.

### 5.9 Payment and Billing Management

#### FR-053 Consultation Fee Configuration

The system shall allow fee setup by doctor, chamber, appointment type, or service.

#### FR-054 Payment Collection

The system shall record online and offline payments.

#### FR-055 Payment Methods

The system shall support cash, card, mobile wallet, bank transfer, and payment gateway methods.

#### FR-056 Payment History

The system shall maintain a patient-wise and appointment-wise payment history.

#### FR-057 Invoices and Receipts

The system shall generate invoices and payment receipts.

#### FR-058 Partial Payment and Due

The system should support partial payment, due balance, and later settlement.

#### FR-059 Refunds

The system should support refund entry with approval and reason tracking.

#### FR-060 Financial Reports

The system shall provide revenue reports by date range, doctor, chamber, and payment method.

### 5.10 Notifications and Communication

#### FR-061 Notification Templates

The system shall support configurable templates for appointment reminders, password reset, renewal alerts, and follow-up reminders.

#### FR-062 Multi-Channel Delivery

The system should support email, SMS, and messaging integrations.

#### FR-063 Follow-Up Reminder

The system shall remind patients for follow-up visits based on doctor instructions.

#### FR-064 Broadcast Messaging

Authorized tenant users should be able to send announcements to selected patients, subject to privacy and anti-spam rules.

### 5.11 Dashboard and Data Visualization

#### FR-065 Doctor Dashboard

The system shall provide doctors with dashboard widgets for today’s appointments, revenue, pending follow-ups, recent patients, and queue status.

#### FR-066 Patient Trends

The system should visualize patient visit trends, appointment counts, and disease categories.

#### FR-067 Revenue Analytics

The system shall provide revenue analytics by day/week/month/custom date range.

#### FR-068 Operational Insights

The system should show no-show rates, cancellation rates, repeat patient ratio, and appointment source.

#### FR-069 Exportable Reports

The system shall allow exporting dashboard data and reports to printable/PDF or spreadsheet-friendly formats.

### 5.12 Admin Portal Management

#### FR-070 Tenant Directory

Platform admin shall view all tenants, plans, statuses, usage metrics, and renewals.

#### FR-071 Plan Management

Platform admin shall create and update SaaS subscription plans and features.

#### FR-072 Global User Support

Platform admin shall manage support tickets, onboarding notes, and issue escalations.

#### FR-073 Global Analytics

Platform admin shall view system-wide usage, revenue, churn, subscription, and storage analytics.

#### FR-074 Compliance and Audit Review

Platform admin shall review audit trails, login anomalies, and administrative actions.

### 5.13 Audit, Compliance, and Logging

#### FR-075 Audit Logs

The system shall log critical actions such as login, record creation/update/deletion, permission change, billing action, and file access.

#### FR-076 Access Logs

The system should log who viewed sensitive patient records and when.

#### FR-077 Data Retention Policy

The system should support configurable retention/archival rules according to plan or regulation.

#### FR-078 Soft Delete and Recovery

The system should support soft delete for selected records and authorized restoration.

### 5.14 Search, Export, and Printing

#### FR-079 Global Search

The system shall provide contextual search for patients, appointments, prescriptions, reports, and invoices.

#### FR-080 Filter and Sort

The system shall allow filters by doctor, chamber, date, status, diagnosis, payment status, and document type.

#### FR-081 PDF Generation

The system shall generate printable PDF documents for prescriptions, invoices, reports summary, and appointment slips.

#### FR-082 Print Layouts

The system shall offer printer-friendly layouts supporting A4 and common chamber print formats.

### 5.15 Support and Helpdesk

#### FR-083 Support Ticketing

The system should allow tenants to raise support tickets to platform admin.

#### FR-084 Knowledge Base

The platform should include help articles, FAQs, and onboarding guides.

---

## 6. Non-Functional Requirements

### 6.1 Performance

* **NFR-001:** The system should load primary dashboard pages within 3 seconds under normal load.
* **NFR-002:** Search results for common patient/appointment queries should return within 2 seconds for standard datasets.
* **NFR-003:** The system shall support concurrent usage across multiple tenants without cross-tenant degradation beyond agreed SLA.
* **NFR-004:** File upload progress shall be visible for large reports.

### 6.2 Scalability

* **NFR-005:** The architecture shall support horizontal scaling of web and API tiers.
* **NFR-006:** The multi-tenant design shall support growth from tens to thousands of tenants.
* **NFR-007:** Storage architecture shall support large volumes of medical files and images.

### 6.3 Security

* **NFR-008:** All communication shall occur over HTTPS.
* **NFR-009:** Passwords shall be stored using strong one-way hashing.
* **NFR-010:** Sensitive data shall be protected through encryption in transit and at rest where applicable.
* **NFR-011:** The system shall enforce tenant-level data isolation.
* **NFR-012:** Access to patient medical records shall be controlled by RBAC and auditable.
* **NFR-013:** The system should support MFA for privileged accounts.
* **NFR-014:** The application shall protect against common web vulnerabilities such as XSS, CSRF, SQL injection, broken access control, and insecure file upload.
* **NFR-015:** Uploaded files shall be validated for type, size, and malware scanning integration readiness.

### 6.4 Availability and Reliability

* **NFR-016:** The system should target 99.5% or better monthly uptime for production.
* **NFR-017:** Automated backups shall run on a defined schedule.
* **NFR-018:** Recovery procedures shall be documented and tested.
* **NFR-019:** Critical transactions such as payments and record creation shall be atomic and consistent.

### 6.5 Maintainability

* **NFR-020:** Code shall follow modular architecture and coding standards.
* **NFR-021:** APIs shall be versioned.
* **NFR-022:** Logging and monitoring shall support root-cause analysis.
* **NFR-023:** The system shall support environment-based configuration for dev, staging, and production.

### 6.6 Usability

* **NFR-024:** The UI shall be responsive for desktop, tablet, and mobile browsers.
* **NFR-025:** Forms shall include validation, inline guidance, and clear error messages.
* **NFR-026:** The platform shall support printable layouts for medical documents.
* **NFR-027:** Navigation should minimize clicks for frequent chamber tasks.

### 6.7 Compliance and Privacy

* **NFR-028:** The system shall support consent-aware handling of patient data.
* **NFR-029:** The platform shall provide audit evidence for critical medical and billing actions.
* **NFR-030:** Data export and deletion requests should be supportable based on applicable regulations.

### 6.8 Interoperability

* **NFR-031:** The system should expose secure APIs for future mobile apps and third-party integrations.
* **NFR-032:** The platform should support integration with payment gateways, SMS/email providers, and telemedicine tools.

### 6.9 Localization

* **NFR-033:** The system should be designed for multi-language support.
* **NFR-034:** Date, time, currency, prescription formats, and address fields should be configurable per tenant or region.

### 6.10 Observability

* **NFR-035:** The system shall collect application logs, error events, and performance metrics.
* **NFR-036:** Admins should be alerted about critical failures such as payment sync failures, storage issues, or suspicious login patterns.

---

## 7. Multi-Tenant Architecture Requirements

### 7.1 Tenant Isolation Model

* Each doctor/clinic acts as a separate tenant.
* Tenant data must not be visible across other tenants.
* All business records must contain tenant ownership metadata.
* Queries and APIs must always be tenant-scoped.

### 7.2 Suggested Tenant Scope Entities

* Tenant
* Subscription
* Chamber
* Staff Users
* Patients
* Appointments
* Encounters
* Prescriptions
* Reports / Files
* Payments / Invoices
* Notification logs
* Audit logs

### 7.3 SaaS Architecture Expectations

* Shared application with tenant-aware authorization
* Centralized platform admin layer
* Logical data isolation using tenant IDs or schema-based isolation depending on implementation strategy
* Tenant-specific branding and settings
* Usage metering for storage, users, and transactions
* Plan-based feature flags

### 7.4 Recommended Architectural Approach

For MVP and easier operations, use:

* Shared database with strict tenant_id isolation for most tables, **or** separate schemas if compliance/load requires it.
* Central landlord database for platform-level entities such as subscription plans, tenant registration, billing, and provisioning.
* Dedicated file path prefixing or bucket namespace per tenant for document isolation.

### 7.5 Tenant Provisioning Requirements

* Create tenant account
* Create default doctor owner role
* Assign subscription plan
* Initialize branding/settings
* Create default chamber
* Enable feature flags
* Set storage quotas and user limits

---

## 8. Role-Based Access Control (RBAC) Requirements

### 8.1 Core RBAC Principles

* Users shall be assigned one or more roles.
* Roles shall map to permissions.
* Permissions shall control view/create/update/delete/export/print actions.
* Sensitive modules shall require granular permission checks.

### 8.2 Minimum Roles

* Platform Super Admin
* Platform Support Admin
* Tenant Owner / Doctor
* Chamber Admin
* Receptionist
* Assistant / Nurse
* Accountant
* Patient

### 8.3 Permission Categories

* Tenant settings management
* User and role management
* Patient profile access
* Appointment management
* Encounter and diagnosis access
* Prescription create/edit/print
* Payment view/create/refund
* File upload/view/download/delete
* Report export
* Dashboard analytics access
* Audit log access

### 8.4 Sensitive Access Rules

* Only doctors and explicitly authorized roles can create or sign prescriptions.
* Only authorized users can access financial summaries.
* Patients can view only their own data.
* Platform admin shall not access tenant medical details by default unless emergency support mode is enabled and logged.

---

## 9. External Interface Requirements

### 9.1 User Interface

* Responsive web UI built with Next.js
* Clean dashboard layouts for admin, doctor, staff, patient
* Print-friendly templates
* Drag-and-drop or guided upload for reports
* Search-first chamber workflow

### 9.2 API Interface

Recommended API domains/modules:

* Auth API
* Tenant Management API
* Doctor/Chamber API
* Patient API
* Appointment API
* Encounter API
* Prescription API
* Billing API
* Document API
* Notification API
* Analytics API
* Audit API

### 9.3 Payment Gateway Integrations

* Online appointment payment
* Subscription billing payment
* Refund callback handling
* Payment reconciliation logs

### 9.4 Notification Providers

* Email SMTP/provider integration
* SMS provider integration
* Optional messaging platform integration

### 9.5 File Storage

* Cloud object storage preferred for production
* CDN-ready file access for performance where allowed
* Signed URL or protected file delivery for sensitive documents

---

## 10. Core Data Entities

### 10.1 Tenant

* id
* name
* slug/subdomain
* owner_user_id
* plan_id
* status
* billing_cycle
* storage_quota
* created_at

### 10.2 User

* id
* tenant_id (nullable for platform admin)
* name
* email
* phone
* password_hash
* role_id / role mapping
* status
* last_login_at

### 10.3 Chamber

* id
* tenant_id
* name
* address
* phone
* working_hours
* status

### 10.4 Patient

* id
* tenant_id
* patient_code
* full_name
* dob
* age
* gender
* phone
* email
* address
* blood_group
* allergies
* chronic_conditions
* emergency_contact

### 10.5 Appointment

* id
* tenant_id
* patient_id
* doctor_user_id
* chamber_id
* appointment_type
* appointment_date
* slot_time
* token_number
* status
* fee
* notes

### 10.6 Encounter

* id
* tenant_id
* appointment_id
* patient_id
* doctor_user_id
* symptoms
* observations
* diagnosis
* advice
* follow_up_date

### 10.7 Prescription

* id
* tenant_id
* encounter_id
* patient_id
* doctor_user_id
* prescription_number
* content_json / structured fields
* signed_at
* version

### 10.8 Medical Document

* id
* tenant_id
* patient_id
* encounter_id nullable
* category
* file_name
* file_path
* mime_type
* file_size
* uploaded_by
* uploaded_at

### 10.9 Payment

* id
* tenant_id
* patient_id
* appointment_id nullable
* invoice_id nullable
* amount
* method
* status
* transaction_ref
* paid_at

### 10.10 Invoice

* id
* tenant_id
* invoice_number
* patient_id
* appointment_id nullable
* total_amount
* paid_amount
* due_amount
* status

### 10.11 Audit Log

* id
* tenant_id nullable
* user_id
* action
* entity_type
* entity_id
* before_data nullable
* after_data nullable
* ip_address
* created_at

---

## 11. Use Cases Summary

### 11.1 Platform Admin Use Cases

* Register and manage tenants
* Manage plans, pricing, and renewals
* Suspend abusive or expired tenants
* View platform analytics
* Review audit and support logs

### 11.2 Doctor Use Cases

* Configure chamber and schedule
* Manage appointments and queue
* Access patient records
* Create prescriptions
* Review disease and treatment history
* Upload or review reports
* Track payments and analytics
* Print documents

### 11.3 Staff Use Cases

* Add patients
* Book appointments
* Check in patients
* Generate tokens
* Collect payments
* Upload files under allowed permissions

### 11.4 Patient Use Cases

* Register and manage profile
* Book/reschedule/cancel appointment
* Upload reports
* View prescriptions and medical documents
* View payment history
* Download printable documents

---

## 12. Reporting Requirements

The system shall provide at minimum:

* Daily appointment report
* No-show/cancelled appointment report
* Revenue report by date and payment method
* Due payments report
* Patient visit history report
* Prescription history report
* Uploaded report/document history
* Doctor productivity summary
* Tenant subscription billing report
* Platform MRR/ARR-style SaaS summary for admin

---

## 13. Security and Privacy Requirements

* Access must be authenticated and authorized.
* Patient medical records are sensitive and should have restricted access.
* File storage should use non-public access by default.
* Critical events must be auditable.
* Admin impersonation or support-mode access must be controlled, temporary, and logged.
* Session timeout policies should be configurable.
* Brute-force protection and rate limiting should be implemented.
* Secure file validation must prevent executable or malicious uploads.
* Data export actions should be permission-based and logged.

---

## 14. Backup, Recovery, and Archival

* Daily automated database backups
* Regular backup verification and restore drills
* File storage replication or backup policy
* Optional archive storage tier for old medical documents
* Defined RPO/RTO targets based on hosting plan

---

## 15. Acceptance Criteria at System Level

The system will be considered acceptable when:

1. A doctor can register as a tenant and access a chamber dashboard.
2. Tenant users can manage appointments, patients, prescriptions, documents, and payments.
3. Patients can book appointments and view their own records securely.
4. Platform admins can manage subscription plans and tenant lifecycle.
5. Data is isolated correctly between tenants.
6. Role-based permissions prevent unauthorized record access.
7. Reports, prescriptions, and invoices can be viewed, downloaded, and printed.
8. Dashboards show meaningful operational and financial data.
9. File upload and document retrieval work securely.
10. Audit logs are available for critical actions.

---

## 16. Out of Scope for Initial MVP

Recommended to exclude from initial MVP unless budget allows:

* Full hospital ERP workflows
* Pharmacy inventory management
* Lab management system
* Insurance claim processing engine
* Native mobile apps
* Advanced AI diagnosis support
* EHR interoperability standards implementation such as HL7/FHIR in phase 1
* Multi-country tax/legal customization in phase 1

---

## 17. Risks and Considerations

1. **Medical data sensitivity risk** – requires strong security and privacy controls.
2. **Multi-tenant isolation risk** – incorrect query scoping could expose data.
3. **Print formatting complexity** – prescriptions and invoices need careful browser/PDF testing.
4. **File storage growth risk** – image/report storage can increase costs quickly.
5. **Regional compliance risk** – healthcare regulations differ by country.
6. **Doctor workflow variability** – prescription and chamber process may differ by specialty.
7. **Payment gateway dependency risk** – reconciliation issues can affect billing trust.
8. **User adoption risk** – chamber staff may need simple UX and onboarding.

---

## 18. Clarifying Questions for Client

1. Should a tenant represent only one doctor, or can one tenant have multiple doctors?
2. Do you want subdomain-based tenancy such as doctorname.yourapp.com?
3. Will patients be global across the platform, or unique per doctor/tenant?
4. Do you want online payments for both appointments and SaaS subscriptions from day one?
5. Which payment gateways must be supported initially?
6. Do you need telemedicine/video consultation in MVP?
7. Should prescriptions support local language and English both?
8. Do you want a receptionist/nurse role with custom permissions per tenant?
9. Should patient documents be uploadable by both patient and doctor staff?
10. Do you need WhatsApp or SMS notifications in MVP?
11. Should a doctor support multiple chambers with separate schedules and fees?
12. Do you need public doctor profile pages for appointment discovery?
13. Should the system support coupon/discounts for SaaS plans or appointments?
14. Do you need accounting-grade reports or only chamber-level payment summaries?
15. What compliance region should be considered first (e.g., local privacy law, HIPAA-like needs, GDPR-like needs)?
16. Should there be e-signature or digital signature requirements for prescriptions?
17. Do you need inventory modules later for medicines or consumables?
18. Should patient self-registration be open, invitation-based, or doctor-approved?
19. Do you need support for attachments inside prescriptions and follow-up plans?
20. Is there a target MVP launch date and expected tenant count in the first year?

---

## 19. Recommended MVP Scope

### MVP Must-Have

* Tenant registration and subscription basics
* Admin portal with tenant management
* Doctor portal
* Patient portal
* RBAC
* Patient management
* Appointment booking and scheduling
* Queue/token management
* Consultation notes and diagnosis
* Prescription generation and print
* Report upload and storage
* Payment history and receipt generation
* Dashboard with basic analytics
* Audit logs

### Phase 2 Recommended

* Teleconsultation
* Advanced analytics
* Public doctor directory
* Marketing pages per doctor
* Messaging automation
* Support ticketing
* AI-assisted notes
* Advanced compliance automation

---

## 20. Suggested Technology Responsibility Split

### Next.js

* Public SaaS landing pages
* Portal UI for admin, doctor, staff, patient
* Dashboard visualization
* Search, forms, printable UI, document preview pages

### Laravel

* Authentication and authorization backend
* Tenant provisioning and SaaS billing logic
* REST/JSON APIs
* Business logic for appointments, prescriptions, billing, documents
* Queue jobs, notifications, audit logging, file handling
* Admin back office services

---

## 21. Conclusion

This SRS defines a strong foundation for a multi-tenant SaaS doctor chamber management platform. It supports private practice digitization, patient engagement, appointment and prescription management, secure medical record handling, financial tracking, and platform-level SaaS administration. The architecture and requirements are designed to be scalable, secure, and commercially viable for launching as a SaaS product.
