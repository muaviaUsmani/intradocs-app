import { ReactNode } from "react"
import clsx from "clsx"
import dayjs from "dayjs"
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function getTimestamp(timestamp: string) {
  const now = dayjs()
  const createdAt = dayjs(parseInt(timestamp))
  const time = now.diff(createdAt, "day") < 1 ? createdAt.fromNow() : createdAt.format("M/D/YY h:m A")
  return time
}

interface TagProps {
  children: ReactNode
  className?: string
}

function Tag({
  children,
  className,
}: TagProps) {
  return (
    <span className={clsx(["text-xs mx-1 bg-slate-200 text-slate-900 px-3 py-1 rounded-full", className])}>{children}</span>
  )
}

interface DocumentProps {
  document: any
}

export default function Document({
  document,
}: DocumentProps) {
  const {
    title,
    body,
    tags,
    createdAt,
    createdBy: { fullName },
  } = document
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold  cursor-pointer">{title}</h2>
      <p className="text-sm text-slate-500 italic mt-1">Created by {fullName} on {getTimestamp(createdAt)}</p>
      <p className="my-4">{body}</p>
      <div>
        <span className="font-semibold text-xs mr-1">Tags:</span>
        {tags.map((tag: string) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </div>
  )
}
