import React, { useState, useEffect } from 'react'
import databaseService from '../Appwrite/Config'
import { Container } from '../components';
import { useSelector } from 'react-redux';
import { PostCard } from '../components';
function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const authUser = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (authUser !== null) {
            databaseService.getPosts()
                .then((posts) => {
                    if (posts) {
                        console.log("posts:", posts)
                        setPosts(posts.documents)
                    }
                })
        }
    }, [authUser])

    const authPost = useSelector((state) => state.post.posts)
    console.log("authPost:", authPost)

    if (!authUser) {
        return (
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to create posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts && posts.map((post) => (
                        <div key={post.$id} className='p-3 w-1/4'>
                            <PostCard {...post

                            } />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )



}

export default Home
