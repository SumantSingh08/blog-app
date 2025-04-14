import React, {useEffect, useState} from 'react'
import databaseService from '../Appwrite/Config'
import { Container, PostCard } from '../components';
function AllPost() {
    const [posts, setposts] = useState([]);
    useEffect(() =>{
        databaseService.getPosts([])
        .then((posts) =>{
            console.log("Allposts:", posts)
            setposts(posts.documents)
        });
    },[])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) =>(
                        <div key={post.$id} className='p-3 w-1/4'>
                            <PostCard {...post
                                
                            }/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost
