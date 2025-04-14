import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import databaseService from '../../Appwrite/Config';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';
import FTE from '../FTE';
import RTE from '../RTE';
import { useDispatch } from 'react-redux';
import AddPost from '../../pages/AddPost';
import { addPost } from '../../store/authSlice';
function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control,  getValues} = useForm({
        defaultValues:{
            title : post?.post || '', 
            slug : post?.slug || '',
            content : post?.content || '',
            status : post?.status || 'active'
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch()

    const submit = async (data) => {
        console.log("data of editor", data)
        if (post) {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

            if (file) {
                databaseService.deleteFile(post.featuredImage);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                console.log("dbPost:", dbPost)
                dispatch(addPost(dbPost))
                navigate(`/post/${dbPost.$id}`);
            }
        }  else {

            const file =  await databaseService.uploadFile(data.image[0]) 
            
            if (file) {
                
                const fileId = file.$id;
                console.log("fileId:", fileId)
                data.featuredImage = fileId;
                const dbPost = await databaseService.creatPost(  { ...data, userId : userData.$id} );
                console.log("dbPost:", dbPost)
                if (dbPost) {
                    
                    dispatch(addPost(dbPost))
                    
                    navigate(`/post/${dbPost.$id}`)
                }
                
            }

        };

        
    }

    const slugTransform = useCallback((value) =>{
        if (value && typeof value === "string") {
            return value
            .trim()
            .toLowerCase()
            .replace(/\s/g,'_')
            /* .replace(/[^a-zA-Z\d\s]+/g, '_') */
        } else{
            return  ''
        }

    }, [])

    // impQ: if you call a meathod inside useEffect , how optimise the meathod
    useEffect(() =>{
        const subscription = watch((value, {name}) =>{
            if (name === 'title') {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        })

        return () => subscription.unsubscribe()
        
    }, [watch, setValue, slugTransform])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-stone-300 p-4">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            {/* <FTE label="content: " name="content" control={control} defaultValue={getValues("content")}/> */}
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full cursor-pointer">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    )
}

export default PostForm
