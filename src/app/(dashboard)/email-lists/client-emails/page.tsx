"use client"
import SearchNotFound from '@/app/(dashboard)/components/SearchNotFound'
import { useAppSelector } from '@/app/(dashboard)/store/hooks'
import { selectClientEmails } from '@/app/(dashboard)/store/slices/emailListsSlice'
import React from 'react'
import EmailList from '../components/EmailList'

const ClientEmails = () => {
  const clientEmails = useAppSelector(selectClientEmails)
  const searchTerm = ""
  return (
    <>
      {
        // attempt to display the search results, after it's done loading, if there's a search Term
        searchTerm ? (
          clientEmails.length === 0 ? (
            <SearchNotFound message={<>We couldn't find Email that match your search. Please try using <br />different, fewer filters or typing another search request.</>} title={<>Result Not Found</>} />
          ) : (
            <EmailList results={clientEmails} />
          )
        ) : (
          <EmailList results={clientEmails} />
        )
      }
    </>
  )
}

export default ClientEmails
