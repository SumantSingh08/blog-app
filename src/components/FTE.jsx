import React from 'react'
import {Controller} from 'react-hook-form'
import FroalaEditorComponent from 'froala-editor';
import FroalaEditor from 'froala-editor';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

function FTE({name, control, label}) {
    const config= {
        placeholderText: "Edit Your Content Here!",
        
    }
    return (
        <div className='w-full '>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
            name={name || "content"}
            control={control}
            render={({field: {onChange}}) =>(
                
                
                <FroalaEditor
                config={config}
                tag='textarea'
                
                onModelChange={onChange}
                />
            )}
            />
        </div>
    )
}

export default FTE
