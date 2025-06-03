import React from 'react'
import { PostForm as PostformComponent, Container } from '../components'
function AddPost() {
    return (
        <div className='py-16 md:py-24'>
            <Container>
                <PostformComponent />
            </Container>

        </div>
    )
}

export default AddPost
