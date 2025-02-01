import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Container, PostForm } from '../components'

function EditPost() {
    const navigate=useNavigate()
    const {slug}=useParams()
    const [post,setPost]=useState()
    useEffect(()=>{

        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })

        }else{
            navigate("/")
        }

    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost