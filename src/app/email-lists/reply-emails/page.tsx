"use client"
import SearchNotFound from '@/app/components/SearchNotFound'
import { useAppSelector } from '@/app/store/hooks'
import { selectReplyEmails } from '@/app/store/slices/emailListsSlice'
import React from 'react'
import EmailList from '../components/EmailList'

export default function ReplyEmails(){
  const replyEmails = useAppSelector(selectReplyEmails)
  const searchTerm = "search"
  return (
    <>
      {
        // attempt to display the search results, after it's done loading, if there's a search Term
        searchTerm ? (
          replyEmails.length === 0 ? (
            <SearchNotFound message={<>We couldn't find Email that match your search. Please try using <br />different, fewer filters or typing another search request.</>} title={<>Result Not Found</>} />
          ):(
              <EmailList results={replyEmails}/>
            )
        ):(
            <EmailList results={replyEmails}/>
          )
      }
    </>
  )
}
