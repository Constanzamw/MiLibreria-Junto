"use client"
import axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Nav from "../components/nav/Nav";
import Card from "../components/card";
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';

export default function Home() { 
  const router = useRouter()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated, router]);

 

  return (
    <div className='bg-green'>
      <Nav/>
      <div>
        <Card />
      </div>
     
    </div>
);
};

//
