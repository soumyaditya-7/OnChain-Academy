
"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { courses, topics } from "@/lib/data"

export function SearchBar() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleSelectRaw = (id: string, type: 'course' | 'topic') => {
        setOpen(false)
        if (type === 'course') {
            router.push(`/courses/${id}`)
        } else {
            // For topics, maybe just search or go to courses page with query
            router.push(`/courses?topic=${id}`)
        }
    }

    // Wrapper to match CommandItem onSelect signature (value: string) => void
    const handleSelectCourse = (id: string) => () => handleSelectRaw(id, 'course')

    // For topics currently just navigating to courses page as a fallback
    const handleSelectTopic = (id: string) => () => handleSelectRaw(id, 'topic')

    return (
        <div className="w-full max-w-2xl mx-auto relative mb-12">
            <Button
                variant="outline"
                className="w-full h-14 justify-start text-muted-foreground bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 hover:text-foreground hover:border-blue-500/50 transition-all rounded-full px-6 shadow-lg shadow-blue-500/5"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-3 h-5 w-5" />
                <span className="text-lg">What do you want to learn?</span>
                <kbd className="pointer-events-none absolute right-4 top-4 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type to search courses..." />
                <CommandList className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Popular Courses">
                        {courses.map((course) => (
                            <CommandItem key={course.id} onSelect={handleSelectCourse(course.id)}>
                                <course.icon className="mr-2 h-4 w-4" />
                                <span>{course.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Topics">
                        {topics.map((topic) => (
                            <CommandItem key={topic.id} onSelect={handleSelectTopic(topic.id)}>
                                <topic.icon className="mr-2 h-4 w-4" />
                                <span>{topic.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}

