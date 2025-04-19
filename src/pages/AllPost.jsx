import React, {useEffect, useState} from 'react'
import databaseService from '../Appwrite/Config'
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
function AllPost() {
    const [posts, setposts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() =>{
        databaseService.getPosts(userData.$id)
        .then((posts) => {
          console.log("Allposts:", posts);
          if (posts && posts.documents) {
            setposts(posts.documents);
          } else {
            console.error("Unexpected posts response:", posts);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch posts:", err);
        });
    },[])
     if (posts.length === 0) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No Posts Available
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
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
}

export default AllPost
