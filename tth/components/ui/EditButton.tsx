import React from 'react';
import { useRouter } from "next/navigation";


interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}
function EditButton({ projectID, currentUserID }: { projectID: Items; currentUserID: string }) {
    const router = useRouter();

    const deleteItemes=async()=>{
         try {
         console.log(projectID)
        if(projectID.user_id === currentUserID){
  
      console.log('Document successfully deleted!');
      router.push(`/edit-listing?postid=${projectID.id}`);
       }

        else{
          console.log('You do not have permission to delete it');
        }


    } catch (error) {
      console.error('Error deleting document:', error);
    }

    };
  return (
    <>
    {projectID.user_id === currentUserID &&
    <button  onClick={deleteItemes} 
    className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded">Edit Post</button>
    }
   
    </>
  )
}

export default EditButton