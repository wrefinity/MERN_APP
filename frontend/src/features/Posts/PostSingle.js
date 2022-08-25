import React from 'react';
import {useSelector} from 'react-redux';
import {selectPostById} from './postslice';
import {Link, useParams} from 'react-router-dom';
const PostSingle = () => {
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, postId))
  return (
    <div>PostSingle</div>
  )
}

export default PostSingle