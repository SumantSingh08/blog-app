import React, { useState, useEffect } from 'react'
import databaseService from '../Appwrite/Config'
import { Container } from '../components';
import { useSelector } from 'react-redux';
import { PostCard } from '../components';
function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true);
    const userId = userData?.$id
    console.log("home post", posts)
    useEffect(() => {
        try {
            if (authStatus !== null) {
                databaseService.getPosts(userId)
                    .then((posts) => {
                        if (posts) {
                            console.log("posts:", posts)
                            setPosts(posts.documents)
                        }
                        setLoading(false)
                    });
            }

        } catch (error) {
            console.error("Error fetching posts:", error);

        }
    }, [authStatus])

    const authPost = useSelector((state) => state.post.posts)
    console.log("authPost:", authPost)

    if (!authStatus || !userId) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                                Login to Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (loading) {
        return ''
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts && posts.length !== 0 ? posts.map((post) => (
                        <div key={post.$id} className='p-3 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    )) :
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl text-center  text-white font-bold hover:text-gray-500'>
                                No Posts Available
                            </h1>
                        </div>
                    }
                </div>
            </Container>
        </div>
    )



}

export default Home
