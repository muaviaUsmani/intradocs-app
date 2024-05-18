"use client"

import { useQuery } from "@apollo/client"
import clsx from "clsx"
import * as GetDocuments from "./graphql/queries/getDocuments.grapqhl"
import Document from "./Document"

interface DocumentsProps {
  className?: string
}

export default function Documents({
  className,
}: DocumentsProps) {
  const {data, loading, error} = useQuery(GetDocuments.Query, {
    variables: {
      filters: {}
    }
  })
  const { documents } = data || {}

  return (
    <div className={clsx(["w-full divide-y p-4 mt-8", className])}>
      {documents?.map((document: any) => (
        <Document key={document.id} document={document} />
      ))}
    </div>
  )
}
