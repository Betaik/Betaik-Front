"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FileWithPreview } from "@/hooks/use-file-upload"
import { Pattern } from "../patterns/p-file-upload-4"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { IoEyeOutline } from "react-icons/io5"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    photo: z.string().min(1, "Photo is required"),
    Description: z.string().min(1, "Description is required"),
})

type FormValues = z.infer<typeof schema>

const StudentHousingForm = () => {
    const [compound, setCompound] = useState<string | null>(null)
    const [gender, setGender] = useState<string | null>(null)
    const [area, setArea] = useState<string | null>(null)
    const [districts, setDistricts] = useState<string | null>(null)
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [patternKey, setPatternKey] = useState(0)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onBlur",
    })

    React.useEffect(() => {
        setValue("photo", files[0]?.file?.name ?? "", { shouldValidate: true })
    }, [files, setValue])

    const handleClose = () => {
        reset({ name: "", photo: "", Description: "" })
        setCompound(null)
        setGender(null)
        setArea(null)
        setDistricts(null)
        setFiles([])
        setPatternKey(prev => prev + 1)
    }

    const onSubmit = (data: FormValues) => {
        const fullData = {
            ...data,
            compound,
            gender, // حيكون القيمة الجديدة زي ما اخترت
            area,
            districts,
            files: files.map(f => ({
                name: f.file.name,
                preview: f.preview
            })),
            state: "Active"
        }

        // لو عايز تضيف للقديم:
        const existingData = localStorage.getItem("studentHousingData")
        const parsedData = existingData ? JSON.parse(existingData) : []

        // هنا لو عايز تسيب القديم وتضيف الجديد:
        parsedData.push(fullData)

        // لو عايز تمسح القديم وتضيف الجديد بس:
        // const parsedData = [fullData]


        // Reset form بعد الحفظ
        handleClose()

        toast.success('Successfully toasted!')

        localStorage.setItem("studentHousingData", JSON.stringify(parsedData))
        router.push("/dorms-mgt")
    }

    const handleDraft = () => {
        const formValues = {
            name: (document.querySelector('input[name="name"]') as HTMLInputElement)?.value || "",
            Description: (document.querySelector('input[name="Description"]') as HTMLInputElement)?.value || "",
            photo: files[0]?.file?.name ?? "",
        }

        const fullData = {
            ...formValues,
            compound,
            gender,
            area,
            districts,
            files: files.map(f => ({
                name: f.file.name,
                preview: f.preview
            })),
            state: "Draft"
        }

        const existingData = localStorage.getItem("studentHousingData")

        let parsedData = []

        if (existingData) {
            const parsed = JSON.parse(existingData)

            parsedData = Array.isArray(parsed) ? parsed : [parsed]
        }

        parsedData.push(fullData)

        localStorage.setItem("studentHousingData", JSON.stringify(parsedData))

        toast.success("Successfully Drafted!")
        router.push("/dorms-mgt")
    }
    return (
        <div className="flex flex-col gap-4 py-4 px-5 md:gap-6 md:py-6 bg-white rounded-lg border">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input type="text" {...register("name")} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                {/* Pattern Upload */}
                <Pattern
                    key={patternKey}
                    className="w-full"
                    onFilesChange={(files) => setFiles(files)}
                    maxSize={10 * 1024 * 1024}
                    accept="image/*"
                    multiple
                />
                <input type="hidden" {...register("photo")} value={files[0]?.file?.name ?? ""} />
                {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

                {/* Compound + Gender */}
                <div className="flex items-center justify-center gap-2 w-full mt-3">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-gray-700">Compound</label>
                        <Select onValueChange={setCompound} value={compound ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Compound" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Compound</SelectLabel>
                                    <SelectItem value="compound">compound</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label>Gender</label>
                        <Select onValueChange={setGender} value={gender ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="Male and  Female Dorms">Male and  Female Dorms</SelectItem>
                                    <SelectItem value="Male Dorms Only">Male Dorms Only</SelectItem>
                                    <SelectItem value="Female Dorms Only">Female Dorms Only</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Area + District */}
                <div className="flex items-center justify-center gap-2 w-full mt-3">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-gray-700">Area</label>
                        <Select onValueChange={setArea} value={area ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Select Area" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Area</SelectLabel>
                                    <SelectItem value="area">Area</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label>Districts</label>
                        <Select onValueChange={setDistricts} value={districts ?? undefined}>
                            <SelectTrigger className="w-full border border-gray-200 rounded-[10px]">
                                <SelectValue placeholder="Select Districts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Districts</SelectLabel>
                                    <SelectItem value="district">Districts</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <input type="text" {...register("Description")} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
                    {errors.Description && <p className="text-red-500">{errors.Description.message}</p>}
                </div>

                {/* Buttons */}
                <div className="w-full flex items-end justify-end gap-3">
                    <button type="button" onClick={handleClose} className="bg-white cursor-pointer text-gray-500 px-4 py-2 border border-gray-600 rounded-lg hover:bg-red-50">Close</button>
                    <button type="button" onClick={handleDraft} className="bg-white cursor-pointer text-gray-500 px-4 border border-gray-600 py-2 rounded-lg hover:bg-gray-50">Save Draft</button>
                    <button type="button" className="bg-white cursor-pointer text-blue-500 px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-50 flex items-center gap-1"><IoEyeOutline className="text-blue-500" />  Preview</button>
                    <button type="submit" className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600">Publish Dorm</button>
                </div>
            </form>
        </div>
    )
}

export default StudentHousingForm