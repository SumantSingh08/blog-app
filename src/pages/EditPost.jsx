import React, { useEffect, useState } from 'react'
import databaseService from '../Appwrite/Config'
import { useParams, useNavigate } from 'react-router-dom';
import { Container, PostForm } from '../components';
function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    }
                })
        } else {
            navigate(`/`)
        }
    }, [slug, navigate])

    return post ? <div className='py-6'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div> : null
}

export default EditPost
