import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../Appwrite/Config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            databaseService.deletePost(post.$id).then((status) => {
                if (status) {
                    
                    databaseService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };
    
    if (!post) {
        return (
            <div className="py-8">
                <Container>
                    <p className="text-white text-center text-2xl font-bold">Loading post...</p>
                </Container>
            </div>
        );;
    }
    return  (
        <div className="py-8">
            <Container>
                <div className="max-w-xl mx-auto flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 cursor-pointer" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 cursor-pointer" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full  mb-6 flex justify-between">
                    <h1 className="text-lg md:text-2xl mx-auto text-white font-bold">{post.title}</h1>
                    
                </div>
                <div className="browser-css text-center">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    );
}