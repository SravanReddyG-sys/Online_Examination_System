# Online Examination System

A web-based Online Examination System designed to provide a structured platform for conducting online examinations, managing examination content, evaluating student submissions, and presenting examination results.

The project is being developed as both an academic project and a portfolio project, with an emphasis on modular development, clean project organization, and professional Git and GitHub practices.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Objectives](#objectives)
- [System Scope](#system-scope)
- [Key Features](#key-features)
- [System Workflow](#system-workflow)
- [User Roles](#user-roles)
- [Application Modules](#application-modules)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Git Branching Strategy](#git-branching-strategy)
- [Git and GitHub Practices](#git-and-github-practices)
- [Development Roadmap](#development-roadmap)
- [Getting Started](#getting-started)
- [Current Status](#current-status)
- [Future Enhancements](#future-enhancements)
- [Author](#author)
- [License](#license)

---

## Project Overview

The Online Examination System is intended to provide a complete digital examination workflow.

The system allows students to authenticate themselves, view available examinations, read examination instructions, attempt questions within a specified time limit, submit their answers, and view their results.

The system is designed with multiple functional areas so that examination-related activities can be managed in a structured manner.

The project will be developed incrementally using feature-based Git branches, with completed features integrated into the `main` branch.

---

## Objectives

The main objectives of the project are:

- To provide a user-friendly platform for conducting online examinations.
- To provide secure student authentication.
- To allow students to view and attempt available examinations.
- To provide a structured examination interface.
- To implement examination timing and submission.
- To evaluate objective-type examination responses.
- To display examination results and performance information.
- To maintain examination attempt history.
- To provide examination and question management functionality.
- To demonstrate professional Git and GitHub workflows.

---

## System Scope

The system is planned around the following major areas:

1. Public/Landing Page
2. Authentication
3. Student Dashboard
4. Examination
5. Question Bank
6. Examination Management
7. Results and Performance
8. Administration

The initial implementation will focus on the frontend and core examination workflow. Backend, database, and persistent authentication functionality can be integrated as the project progresses.

---

## Key Features

### Authentication

- Student login
- Student registration
- Form validation
- Logout
- Session handling
- Role-based access

### Student Dashboard

- Student profile
- Available examinations
- Upcoming examinations
- Examination status
- Attempt history
- Performance summary

### Examination

- Examination instructions
- Question display
- Multiple-choice questions
- Question navigation
- Answer selection
- Mark questions for review
- Examination timer
- Answer management
- Manual submission
- Automatic submission when time expires

### Question Bank

- Add questions
- Edit questions
- Delete questions
- Categorize questions
- Assign difficulty levels
- Define question marks
- Store correct answers

### Examination Management

- Create examinations
- Configure examination duration
- Configure total marks
- Select examination questions
- Schedule examinations
- Publish examinations
- Manage examination availability

### Results and Performance

- Automatic evaluation
- Score calculation
- Percentage calculation
- Correct answer count
- Incorrect answer count
- Skipped question count
- Performance summary
- Attempt history

### Administration

- User management
- Student management
- Examiner management
- Examination management
- Question bank management
- Result management
- System-level information and analytics

---

## System Workflow

The overall examination workflow is planned as follows:

```text
                         Online Examination System
                                   |
                    +--------------+--------------+
                    |                             |
               Landing Page                 Authentication
                                                  |
                                      +-----------+-----------+
                                      |                       |
                                   Student               Examiner/Admin
                                      |                       |
                                      v                       v
                             Student Dashboard        Management Dashboard
                                      |                       |
                                      |                +------+------+
                                      |                |             |
                                      |          Question Bank   Exam Management
                                      |                |             |
                                      |                +------+------+
                                      |                       |
                                      v                       v
                              Available Exams          Publish/Schedule
                                      |
                                      v
                                Instructions
                                      |
                                      v
                               Start Examination
                                      |
                                      v
                             Questions + Timer
                                      |
                                      v
                              Submit Examination
                                      |
                                      v
                            Automatic Evaluation
                                      |
                                      v
                              Results & Score
                                      |
                                      v
                          Performance & History