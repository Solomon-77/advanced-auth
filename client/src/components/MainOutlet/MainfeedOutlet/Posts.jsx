import { User, Video, Image, Code, SendHorizontal, ThumbsUp, MessageSquare, Forward } from 'lucide-react';

const Posts = () => {

   // const posts -> user, content, timestamp, likes, comments, shares
   const posts = [
      {
         id: 1,
         user: "Russel James",
         content: "Bading ako!",
         timestamp: "2024-12-20",
         likes: 10,
         comments: 3,
         shares: 1
      },
      { id: 2, user: "Jane", content: "Check out this cool photo!", timestamp: "2024-12-19", likes: 15, comments: 5, shares: 2 },
      { id: 3, user: "Alex", content: "Had a great day!", timestamp: "2024-12-18", likes: 8, comments: 2, shares: 0 }
   ];

   return (
      <div>
         {/* post a message, photo, or video */}
         <div className="bg-white rounded-md shadow-sm p-7">
            <div className='flex items-center'>
               <div className='bg-gray-200 p-2 rounded-full mr-4'>
                  <User className='w-6 h-6' />
               </div>
               <textarea className='w-full border border-gray-300 rounded-md p-2'></textarea>
            </div>
            <div className='flex justify-between mt-6'>
               <div className='flex gap-6 text-gray-700'>
                  <Video className='w-6 h-6' />
                  <Image className='w-6 h-6' />
                  <Code className='w-6 h-6' />
               </div>
               <SendHorizontal className='w-6 h-6 text-gray-700' />
            </div>
         </div>

         {/* map the posts */}
         <div className='space-y-6 mt-6'>
            {posts.map(post => (
               <div key={post.id} className='bg-white rounded-md p-7 shadow-sm space-y-6'>
                  <div className='flex items-center'>
                     <div className='bg-gray-200 p-2 rounded-full mr-4'>
                        <User className='w-6 h-6' />
                     </div>
                     <div>
                        <div className='text-lg font-medium'>{post.user}</div>
                        <div className='text-gray-500 '>{post.timestamp}</div>
                     </div>
                  </div>
                  <div>{post.content}</div>
                  <div className='flex gap-4'>
                     <div className='flex items-center rounded-md w-full justify-center gap-3 bg-gray-100 py-2'>
                        <ThumbsUp />
                        <div className='font-medium'>{post.likes}</div>
                     </div>
                     <div className='flex items-center rounded-md w-full justify-center gap-3 bg-gray-100 py-2'>
                        <MessageSquare />
                        <div className='font-medium'>{post.comments}</div>
                     </div>
                     <div className='flex items-center rounded-md w-full justify-center gap-3 bg-gray-100 py-2'>
                        <Forward />
                        <div className='font-medium'>{post.shares}</div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

      </div>
   )
}

export default Posts