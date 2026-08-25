// Hardcoded sample data for the /demo route ONLY.
//
// This file exists purely so the app's UI can be previewed and screenshotted
// without a running MongoDB instance. Shapes mirror what the real API
// returns (see server/models/doctor.js, server/models/appointment.js) so the
// demo screens can reuse the same presentational components, but nothing
// here is wired into axios or any production data-fetching path.

export const DEMO_USER = {
  email: 'jane.doe@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  type: 'patient'
};

export const DEMO_DOCTORS = [
  {
    email: 'a.mehta@mediclick.example',
    firstName: 'Anjali',
    lastName: 'Mehta',
    specialty: { id: 'cardio', name: 'Cardiology' },
    hospital: { name: 'Lakeside General Hospital', address: '221 Elm Street', city: 'Springfield' },
    rating: 4.9,
    reviews: 128,
    experience: 12
  },
  {
    email: 'r.okafor@mediclick.example',
    firstName: 'Raymond',
    lastName: 'Okafor',
    specialty: { id: 'derm', name: 'Dermatology' },
    hospital: { name: 'Springfield Family Clinic', address: '48 Oak Avenue', city: 'Springfield' },
    rating: 4.8,
    reviews: 96,
    experience: 9
  },
  {
    email: 's.kim@mediclick.example',
    firstName: 'Sunwoo',
    lastName: 'Kim',
    specialty: { id: 'peds', name: 'Pediatrics' },
    hospital: { name: 'Riverside Children’s Hospital', address: '10 Harbor Road', city: 'Riverside' },
    rating: 5.0,
    reviews: 214,
    experience: 15
  },
  {
    email: 'l.novak@mediclick.example',
    firstName: 'Lucia',
    lastName: 'Novak',
    specialty: { id: 'gp', name: 'General Physician' },
    hospital: { name: 'Riverside Community Hospital', address: '77 Mill Lane', city: 'Riverside' },
    rating: 4.7,
    reviews: 63,
    experience: 7
  },
  {
    email: 'd.brooks@mediclick.example',
    firstName: 'Daniel',
    lastName: 'Brooks',
    specialty: { id: 'ortho', name: 'Orthopedics' },
    hospital: { name: 'Lakeside General Hospital', address: '221 Elm Street', city: 'Springfield' },
    rating: 4.6,
    reviews: 81,
    experience: 18
  },
  {
    email: 'p.singh@mediclick.example',
    firstName: 'Priya',
    lastName: 'Singh',
    specialty: { id: 'psych', name: 'Psychiatry' },
    hospital: { name: 'Meadowbrook Wellness Center', address: '5 Birch Court', city: 'Meadowbrook' },
    rating: 4.9,
    reviews: 152,
    experience: 11
  }
];

export const DEMO_APPOINTMENTS = [
  {
    _id: 'demo-1',
    date: '8-28-2026',
    time: '10:30',
    symptoms: 'Follow-up on blood pressure medication',
    status: 'active',
    doctor: DEMO_DOCTORS[0]
  },
  {
    _id: 'demo-2',
    date: '9-2-2026',
    time: '15:00',
    symptoms: 'Persistent skin rash on forearm',
    status: 'active',
    doctor: DEMO_DOCTORS[1]
  },
  {
    _id: 'demo-3',
    date: '8-14-2026',
    time: '11:00',
    symptoms: 'Annual pediatric wellness check',
    status: 'closed',
    doctor: DEMO_DOCTORS[2]
  },
  {
    _id: 'demo-4',
    date: '8-9-2026',
    time: '19:30',
    symptoms: 'Knee pain after running',
    status: 'cancelled',
    doctor: DEMO_DOCTORS[4]
  }
];
