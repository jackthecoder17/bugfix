"use client";
import SearchNotFound from "@/app/(dashboard)/components/SearchNotFound";
// import { useAppSelector } from '@/app/(dashboard)/store/hooks'
// import { selectClientEmails } from '@/app/(dashboard)/store/slices/emailListsSlice'
import React, { useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import { AllEmailListApi } from "@/app/api/allemaillistapi";
import Loader1 from "../../components/Loader1";
const ClientEmails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientEmails, setClientEmails] = useState<any[]>([]);
  const [routeurl, setRouteUrl] = useState<string>("");

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/email-lists/reply-emails") {
      console.log("reply");
      setRouteUrl("replyEmails");
    } else if (path === "/email-lists/client-emails") {
      console.log("client");
      setRouteUrl("clientEmails");
    } else {
      setRouteUrl(""); // Set routeUrl to null if pathname doesn't match any condition
    }
    console.log(path);
  }, []); // This useEffect runs only once on initial mount due to the empty dependency array

  useEffect(() => {
    setIsLoading(true);
    const getEmails = async () => {
      try {
        if (routeurl) { // Check if routeurl has a value before making the API call
          const response = await AllEmailListApi(routeurl);
          console.log(response);
          setClientEmails(response.data.emailLists); // Assuming response is the array of email lists
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getEmails();
  }, [routeurl]); // Run this effect whenever routeurl changes


  const searchTerm = "";
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Loader1 />
        </div>
      )}

      {
        // attempt to display the search results, after it's done loading, if there's a search Term
        searchTerm ? (
          clientEmails.length === 0 ? (
            <SearchNotFound
              message={
                <>
                  We couldn't find Email that match your search. Please try
                  using <br />
                  different, fewer filters or typing another search request.
                </>
              }
              title={<>Result Not Found</>}
            />
          ) : (
            <EmailList results={clientEmails} setResults={setClientEmails} />
          )
        ) : (
          <EmailList results={clientEmails} setResults={setClientEmails} />
        )
      }
    </>
  );
};

export default ClientEmails;
