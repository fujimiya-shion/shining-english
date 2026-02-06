'use client'

import { Button } from '@/components/ui/button'
import { AppButton } from '@/components/ui/app-button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

interface Note {
  id: number
  title: string
  content: string
  timestamp: string
  lesson: string
  tags: string[]
}

interface Resource {
  id: number
  title: string
  type: 'pdf' | 'zip' | 'link' | 'video'
  lesson: string
  downloadCount: number
  fileSize?: string
  description: string
}

export function NotesResources() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'State Management Concepts',
      content:
        'State management is crucial for building scalable applications. Key concepts include centralized store, actions, and reducers...',
      timestamp: '2 hours ago',
      lesson: 'Advanced State Management',
      tags: ['state', 'redux', 'important'],
    },
    {
      id: 2,
      title: 'Performance Optimization Tips',
      content:
        'Memoization, lazy loading, and code splitting are essential for optimizing React applications. Remember to use React.memo for components...',
      timestamp: '5 hours ago',
      lesson: 'Optimization Techniques',
      tags: ['performance', 'optimization'],
    },
  ])

  const [resources] = useState<Resource[]>([
    {
      id: 1,
      title: 'Lesson Notes - Advanced Patterns',
      type: 'pdf',
      lesson: 'Advanced React Patterns',
      downloadCount: 234,
      fileSize: '2.3 MB',
      description: 'Complete notes covering advanced React patterns and their use cases',
    },
    {
      id: 2,
      title: 'Code Examples Repository',
      type: 'zip',
      lesson: 'React Patterns',
      downloadCount: 567,
      fileSize: '5.1 MB',
      description: 'Full source code examples for all lessons in this module',
    },
    {
      id: 3,
      title: 'Component Library Documentation',
      type: 'link',
      lesson: 'UI Components',
      downloadCount: 123,
      description: 'Official documentation for the component library used in this course',
    },
    {
      id: 4,
      title: 'Bonus Video: Deep Dive',
      type: 'video',
      lesson: 'Advanced Patterns',
      downloadCount: 89,
      description: 'Extended video explaining complex concepts in detail',
    },
  ])

  const [newNote, setNewNote] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showNoteForm, setShowNoteForm] = useState(false)

  const allTags = ['important', 'review', 'quiz', 'project', 'example', 'reference']

  const handleAddNote = () => {
    if (newNote && newNoteTitle) {
      const note: Note = {
        id: Math.max(...notes.map((n) => n.id), 0) + 1,
        title: newNoteTitle,
        content: newNote,
        timestamp: 'just now',
        lesson: 'Current Lesson',
        tags: selectedTags,
      }
      setNotes([note, ...notes])
      setNewNote('')
      setNewNoteTitle('')
      setSelectedTags([])
      setShowNoteForm(false)
    }
  }

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 110 2h-6a1 1 0 110-2h6V4H6v12a1 1 0 110 2H4a2 2 0 01-2-2V4z" />
          </svg>
        )
      case 'zip':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z" />
          </svg>
        )
      case 'link':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.586 4.586a2 2 0 112.828 2.828l-.793.793-2.828-2.829.793-.793zM9.172 9.172a2 2 0 112.828 2.828L9.05 15.9 6.171 13.02 9.172 9.172z" />
          </svg>
        )
      case 'video':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 min-h-screen">
      {/* Notes Section */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Notes</h2>
            <AppButton
              size="sm"
              onClick={() => setShowNoteForm(!showNoteForm)}
            >
              {showNoteForm ? 'Cancel' : 'New Note'}
            </AppButton>
          </div>

          {showNoteForm && (
            <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Note Title</label>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g., Important Concepts"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Note Content</label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write your notes here..."
                  rows={5}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-border hover:border-primary'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowNoteForm(false)}
                >
                  Cancel
                </Button>
                <AppButton onClick={handleAddNote} disabled={!newNote || !newNoteTitle}>
                  Save Note
                </AppButton>
              </div>
            </div>
          )}

          {notes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notes yet. Start taking notes to remember key concepts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <Card key={note.id} className="p-4 border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{note.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {note.lesson} • {note.timestamp}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{note.content}</p>

                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Resources Sidebar */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <Card className="h-full">
          <Tabs defaultValue="resources" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border">
              <TabsTrigger value="resources" className="rounded-none">
                Resources
              </TabsTrigger>
              <TabsTrigger value="downloads" className="rounded-none">
                Downloads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="flex-1 p-4 space-y-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-muted-foreground">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{resource.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{resource.lesson}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {resource.description}
                      </p>
                      {resource.fileSize && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {resource.fileSize}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 text-xs bg-transparent"
                  >
                    {resource.type === 'link' ? 'Visit' : 'Download'}
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="downloads" className="flex-1 p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium mb-4">Most Downloaded Resources</p>
                {[...resources]
                  .sort((a, b) => b.downloadCount - a.downloadCount)
                  .slice(0, 5)
                  .map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-2 text-xs hover:bg-muted/50 rounded transition-colors"
                    >
                      <span className="flex-1 line-clamp-1">{resource.title}</span>
                      <span className="text-muted-foreground flex-shrink-0 ml-2">
                        {resource.downloadCount}
                      </span>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
