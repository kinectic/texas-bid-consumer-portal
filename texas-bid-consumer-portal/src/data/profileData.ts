export type ConsumerJob = {
  id: string
  title: string
  category: string
  location: string
  status: 'Open for bids' | 'Reviewing bids' | 'Awarded'
  postedAt: string
  bidCount: number
  budget: string
  summary: string
}

export type ConsumerBid = {
  contractor: string
  amount: string
  timing: string
  trustTier: string
  status: 'New' | 'Shortlisted' | 'Waiting on reply'
}

export type ContractorBid = {
  id: string
  jobTitle: string
  customer: string
  location: string
  status: 'Sent' | 'Shortlisted' | 'Won' | 'Archived'
  bidAmount: string
  postedAt: string
  responseTime: string
}

export const consumerPostedJobs: ConsumerJob[] = [
  {
    id: 'job-101',
    title: 'Kitchen tile and grout refresh',
    category: 'Home Repair',
    location: 'Fort Worth, TX',
    status: 'Reviewing bids',
    postedAt: 'Today · 8:14 AM',
    bidCount: 4,
    budget: '$2.4k - $3.1k',
    summary: 'A quick turnaround job for tile replacement, grout repair, and cleanup after work wraps.',
  },
  {
    id: 'job-102',
    title: 'Backyard privacy fence repair',
    category: 'Exterior Work',
    location: 'Arlington, TX',
    status: 'Open for bids',
    postedAt: 'Yesterday · 3:42 PM',
    bidCount: 2,
    budget: '$1.1k - $1.8k',
    summary: 'Need a local crew to patch storm damage, replace posts, and keep the yard secure.',
  },
  {
    id: 'job-103',
    title: 'Hallway paint and trim touch-up',
    category: 'Interior Finish',
    location: 'Dallas, TX',
    status: 'Awarded',
    postedAt: 'Apr 18, 2026',
    bidCount: 3,
    budget: '$850 - $1.2k',
    summary: 'Small finish work from a recent move-in, already assigned to a verified local contractor.',
  },
]

export const consumerBidsByJob: Record<string, ConsumerBid[]> = {
  'job-101': [
    { contractor: 'Bluebonnet Tile Co.', amount: '$2,650', timing: '2 days', trustTier: 'Pro Verified', status: 'Shortlisted' },
    { contractor: 'Lone Star Interiors', amount: '$2,980', timing: 'Next week', trustTier: 'Business Verified', status: 'New' },
    { contractor: 'Eastside Craft Crew', amount: '$2,440', timing: '3 days', trustTier: 'Contact Verified', status: 'Waiting on reply' },
  ],
  'job-102': [
    { contractor: 'Metro Fence Repair', amount: '$1,420', timing: '1 week', trustTier: 'Pro Verified', status: 'New' },
    { contractor: 'North Texas Handyman Group', amount: '$1,190', timing: '4 days', trustTier: 'Business Verified', status: 'Shortlisted' },
  ],
  'job-103': [
    { contractor: 'Sunset Finishing', amount: '$1,075', timing: '2 days', trustTier: 'Top Performer', status: 'Shortlisted' },
    { contractor: 'Trinity Paint Pros', amount: '$940', timing: '3 days', trustTier: 'Pro Verified', status: 'New' },
  ],
}

export const contractorBidQueue: ContractorBid[] = [
  {
    id: 'bid-201',
    jobTitle: 'Kitchen tile and grout refresh',
    customer: 'M. Alvarez',
    location: 'Fort Worth, TX',
    status: 'Shortlisted',
    bidAmount: '$2,650',
    postedAt: 'Today · 9:05 AM',
    responseTime: 'Responded in 18 min',
  },
  {
    id: 'bid-202',
    jobTitle: 'Backyard privacy fence repair',
    customer: 'J. Kim',
    location: 'Arlington, TX',
    status: 'Sent',
    bidAmount: '$1,325',
    postedAt: 'Today · 10:22 AM',
    responseTime: 'Responded in 9 min',
  },
  {
    id: 'bid-203',
    jobTitle: 'Hallway paint and trim touch-up',
    customer: 'R. Carter',
    location: 'Dallas, TX',
    status: 'Won',
    bidAmount: '$1,050',
    postedAt: 'Apr 18, 2026',
    responseTime: 'Responded in 11 min',
  },
  {
    id: 'bid-204',
    jobTitle: 'Driveway crack sealing',
    customer: 'S. Patel',
    location: 'Plano, TX',
    status: 'Archived',
    bidAmount: '$780',
    postedAt: 'Apr 10, 2026',
    responseTime: 'Responded in 7 min',
  },
]

export const consumerProfileSummary = [
  'Sign in once and keep every posted job, message, and shortlist attached to the same account.',
  'Use the profile to review what is open, what is already awarded, and which bids need a reply.',
  'Keep contractor trust and bid comparison close together so the decision stays easy to manage.',
]

export const contractorProfileSummary = [
  'Sign in as the business and see every bid you sent, every reply you are waiting on, and every job you already won.',
  'Track which jobs are hot, which ones are cooling off, and where a follow-up message would help.',
  'Use the profile as the contractor home base before jumping back into discovery or bidding.',
]
