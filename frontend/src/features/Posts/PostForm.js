import React, { useState, useEffect } from "react";
import { addPost } from "./postslice";
import { HandleInput, validateEmpty } from "../FormHelper";

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(category));
    setIsSubmit(true);
  };

  const reset = () => {
    setPost({
      title: "",
      content: "",
      userId: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(addPost({ title, content, userId }));
      reset();
    }
    setLoading(false);
  }, [formErrors]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-3 p-lg-5 border">
          <div className="container p-5 mb-4 bg-danger">
            <h2 className="h3 mb-3 text-white text-center bold-text">
              Add Post
            </h2>
          </div>

          <div className="form-group row">
            <div className="col-md-12">
              <label htmlFor="c_name" className="text-black bold-text">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="c_name"
                name="name"
                value={post.name}
                placeholder="enter post title"
                onChange={(e) => {
                  HandleInput(e, setPost);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-12">
              <label htmlFor="c_name" className="text-black bold-text">
                Content <span className="text-danger">*</span>
              </label>
              <textarea
                id="c_message"
                cols="30"
                rows="7"
                name="description"
                value={post.content}
                className="form-control"
                onChange={(e) => handleInput(e, setPost)}
              ></textarea>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-lg-12">
              <p className="h5 text-danger m-2">{formErrors?.all}</p>

              <button className="btn btn-danger btn-block bold-text">
                Add Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;