"use client"

import React, { useState, useEffect } from "react"
import PropertyCard from "../cards/PropertyCard"
import { BiSearchAlt } from "react-icons/bi"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

type TabType = "Active" | "Draft" | "Expired"

const PropertyFilters = () => {
    const [activeTab, setActiveTab] = useState<TabType>("Active")
    const [genderFilter, setGenderFilter] = useState<string>("All Droms")
    const [statusFilter, setStatusFilter] = useState<string>("All Statuses")
    const [searchText, setSearchText] = useState<string>("")
    const [properties, setProperties] = useState<any[]>([])

    // Load stored properties on mount
    useEffect(() => {
        const stored = localStorage.getItem("studentHousingData")
        if (stored) {
            setProperties(JSON.parse(stored))
        }
    }, [])

    // فلترة الخصائص
    const filteredProperties = properties.filter(prop => {
        const statusMatch = statusFilter === "All Statuses" || prop.state === statusFilter
        const genderMatch = genderFilter === "All Droms" || prop.gender === genderFilter
        const searchMatch = !searchText || prop.name?.toLowerCase().includes(searchText.toLowerCase())
        return statusMatch && genderMatch && searchMatch
    })

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 w-full">
            {/* Tabs & Filters */}
            <div className="flex flex-col w-full">
                <div className="w-52.75 h-9 flex gap-5 mt-5">
                    {(["Active", "Draft", "Expired"] as TabType[]).map(tab => (
                        <div
                            key={tab}
                            className={`text-sm cursor-pointer ${activeTab === tab
                                ? "text-[#155DFC] bg-gray-100 rounded-2xl px-3 py-2"
                                : "text-[#7F8595] px-3 py-2"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                <div className="h-11 flex justify-between md:flex-row flex-col gap-2 items-center p-2 mt-9 w-full">
                    {/* Search Input */}
                    <div className="w-full max-w-7xl h-10 items-center flex md:justify-between border border-gray-200 rounded-[10px]">
                        <div className="ml-4">
                            <BiSearchAlt className="text-[#7F8595]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full h-full focus:outline-none p-2"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    {/* Status Filter */}
                    <Select onValueChange={setStatusFilter} value={statusFilter}>
                        <SelectTrigger className="md:max-w-80 w-full items-center flex gap-2.5 border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>All Statuses</SelectLabel>
                                {["All Statuses", "Active", "Draft", "Expired"].map(item => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Gender Filter */}
                    <Select onValueChange={setGenderFilter} value={genderFilter}>
                        <SelectTrigger className="w-full md:max-w-80 items-center flex gap-2.5 border border-gray-200 rounded-[10px]">
                            <SelectValue placeholder="All Droms" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>All Droms</SelectLabel>
                                {["All Droms", "Male and  Female Dorms", "Male Dorms Only", "Female Dorms Only"].map(item => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Property Cards */}
            <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 mt-2">
                {Array.from({ length: 6 }).map((_, i) => {
                    const property = filteredProperties[i]
                    return (
                        <PropertyCard
                            key={i}
                            isEmpty={!property}
                            data={property ?? {}}
                            onClick={() => { }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default PropertyFilters