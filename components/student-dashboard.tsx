'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EnrolledCourse {
  id: number
  title: string
  category: string
  progress: number
  image: string
  instructor: string
  nextLesson?: string
  lastAccessed: string
}

export function StudentDashboard() {
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: 1,
      title: 'English Grammar Mastery',
      category: 'English Grammar',
      progress: 65,
      image: '/images/grammar-course.jpg',
      instructor: 'Prof. Robert Thompson',
      nextLesson: 'Advanced Tense Usage',
      lastAccessed: '2 hours ago',
    },
    {
      id: 2,
      title: 'Advanced Spoken English',
      category: 'English Speaking',
      progress: 42,
      image: '/images/spoken-english-course.jpg',
      instructor: 'Ms. Jennifer Blake',
      nextLesson: 'Presentation Skills',
      lastAccessed: '1 day ago',
    },
    {
      id: 3,
      title: 'English Writing & Composition',
      category: 'English Writing',
      progress: 78,
      image: '/images/writing-course.jpg',
      instructor: 'Dr. Emily Watson',
      nextLesson: 'Essay Writing Techniques',
      lastAccessed: '3 hours ago',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'completed',
      title: 'Completed lesson: Perfect Tenses',
      course: 'English Grammar Mastery',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'passed',
      title: 'Passed Quiz: Verb Forms',
      course: 'English Grammar Mastery',
      score: 92,
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'enrolled',
      title: 'Enrolled in new course',
      course: 'Advanced Spoken English',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'completed',
      title: 'Completed lesson: Pronunciation Basics',
      course: 'Advanced Spoken English',
      time: '2 days ago',
    },
  ]

  const certificatesEarned = [
    {
      id: 1,
      course: 'English Grammar Fundamentals',
      earnedDate: 'Jan 15, 2025',
      credentialId: 'UC-2025-001',
    },
    {
      id: 2,
      course: 'Business English Communication',
      earnedDate: 'Dec 20, 2024',
      credentialId: 'UC-2024-089',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              LH
            </div>
            <span className="font-semibold text-lg">LearnHub</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm hover:text-primary transition-colors">Explore</button>
            <button className="text-sm hover:text-primary transition-colors">My Learning</button>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              JD
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-2">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Courses Enrolled</p>
            <p className="text-3xl font-bold mt-2">3</p>
            <p className="text-xs text-muted-foreground mt-2">Keep learning!</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Learning Hours</p>
            <p className="text-3xl font-bold mt-2">24.5</p>
            <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Certificates</p>
            <p className="text-3xl font-bold mt-2">2</p>
            <p className="text-xs text-muted-foreground mt-2">Show your skills</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Current Streak</p>
            <p className="text-3xl font-bold mt-2">7 days</p>
            <p className="text-xs text-muted-foreground mt-2">Consistent learner!</p>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learning" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="learning">My Learning</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* My Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <p className="text-xs font-medium text-primary uppercase">{course.category}</p>
                      <h3 className="mt-2 font-semibold line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 text-xs text-muted-foreground">
                        Next: {course.nextLesson}
                      </div>

                      <Button className="mt-4 w-full">Continue</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <Card key={activity.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'completed' && (
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-accent"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        {activity.type === 'passed' && (
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-accent"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        )}
                        {activity.type === 'enrolled' && (
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.course}
                          {activity.type === 'passed' && (
                            <span className="ml-2 font-medium">• Score: {activity.score}%</span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Certificates</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {certificatesEarned.map((cert) => (
                  <Card key={cert.id} className="p-6 border-2 border-accent/30 bg-accent/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-accent uppercase">Certificate</p>
                        <h3 className="text-lg font-bold mt-2">{cert.course}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Earned on {cert.earnedDate}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ID: {cert.credentialId}
                        </p>
                      </div>
                      <svg
                        className="h-8 w-8 text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15.09 8.26h6.79L17.17 13.26l3.09 6.26L12 15.77L8.91 19.52l3.09-6.26L2.12 8.26H8.91L12 2z" />
                      </svg>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                        View
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                        Share
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
