"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { collegeTeams } from "@/lib/college-teams"

interface TeamSelectorProps {
  selectedTeam: string
  onSelect: (team: string) => void
  label: string
  defaultValue?: string
}

export function TeamSelector({ selectedTeam, onSelect, label, defaultValue = "Select team..." }: TeamSelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium mb-1">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {selectedTeam || defaultValue}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search team..." />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {collegeTeams.map((team) => (
                  <CommandItem
                    key={team}
                    value={team}
                    onSelect={() => {
                      onSelect(team)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selectedTeam === team ? "opacity-100" : "opacity-0")} />
                    {team}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
