import { Appbar } from "../components/Appbar"
import axios from "axios"
import { useState } from "react"
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { api} from "../atoms/blogList"

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const url = useRecoilValue(api);


    return (
        <div className="box-border m-0 p-0 ">
            <header className="relative h-auto">
                <Appbar />
            </header>
            <div className="w-full mt-20 sm:w-4/6 p-2 mx-auto bg-slate-200 border-2 rounded-2xl border-slate-200">
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Create Your Post
                </div>
                <input onChange={(e) => { setTitle(e.target.value) }} className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Title"></input>
                <TextEditor setDescription={setDescription}></TextEditor>
                <button onClick={async() => {
                    const response = await axios.post(`${url}blog`, {
                      title:`${title}`,
                      content:`${description}`
                    },{
                      headers : {
                        Authorization : localStorage.getItem("token")
                      }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    )
}


interface TextEditorProps {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = React.memo(({ setDescription }) => {
    return (
      <div>
        <div className="w-full mb-4 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <label htmlFor="editor" className="sr-only">Publish post</label>
            <textarea
              id="editor"
              onChange={(e) => setDescription(e.target.value)}
              rows={12}
              className="outline-none block w-full px-2.5 text-sm text-gray-800 bg-white border-0"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    );
  });

