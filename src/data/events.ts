
export type CampusEvent = {
  id: number
  title: string
  date: string
  place: string
  seats: number
}

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'React Study Night',
    date: '2026-11-05',
    place: 'Room 302',
    seats: 20,
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    date: '2026-11-10',
    place: 'Computer Lab 1',
    seats: 3,
  },
  {
    id: 3,
    title: 'UI Design Meetup',
    date: '2026-11-15',
    place: 'Room 205',
    seats: 15,
  },
  {
    id: 4,
    title: 'Git and GitHub Practice',
    date: '2026-11-20',
    place: 'Computer Lab 2',
    seats: 2,
  },
]
