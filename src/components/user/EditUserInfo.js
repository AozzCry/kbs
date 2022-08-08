import React, { useState, useContext } from "react";

import API from "../../env";
import UserContext from "../../store/UserContext";
import TagInput from "../../ui/TagInput";
import Avatar from "./Avatar";
import Album from "./Album";

const EditUserInfo = () => {
  const ctx = useContext(UserContext);

  const { description: userDesc, tags: userTags } = ctx.userData.user;

  const [description, setDescription] = useState(userDesc);
  const [tags, setTags] = useState(userTags);
  const [photo, setPhoto] = useState();
  const [photos, setPhotos] = useState([]);

  const onSubmitHandler = async () => {
    try {
      const resp = await fetch(`${API}/api/user/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${ctx.userData.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          description,
          tags: tags.filter((n) => n),
        }),
      });

      const data = await resp.json();

      const userData = { ...ctx.userData };
      userData.user.tags = data.tags;
      userData.user.description = data.description;

      ctx.setUserData(userData);

      if (photo) {
        const form = await new FormData();
        await form.append("avatar", photo);
        await fetch(`${API}/api/photos/upload`, {
          method: "post",
          headers: {
            "Context-type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer 12|bPeswddM0gJhKDleakygQG2Y0FEVdJ1O1HFWSblX",
          },
          body: form,
        }).then((data) => data.json());
      }

      if (photos) {
        const form = await new FormData();
        photos.forEach((photo) => {
          form.append("avatar", photo);
        });

        await fetch(`${API}/api/photos/upload`, {
          method: "post",
          headers: {
            "Context-type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer 12|bPeswddM0gJhKDleakygQG2Y0FEVdJ1O1HFWSblX",
          },
          body: form,
        }).then((data) => data.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card  shadow-lg">
      <div className="card-body bg-base-300 flex flex-col items-center">
        <h2 className="card-title">Edit your profile!</h2>
        <div className="form-control w-full max-w-xs w-full">
          <label className="form-control w-full max-w-xs">
            <span className="text-center text-xl w-full mt-8 mb-2">
              Description
            </span>
          </label>
          <textarea
            type="text"
            placeholder="Change description here"
            className="input h-32 hover:input-primary"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <h2 className="text-center text-xl w-full mt-6">Tags</h2>
          <div className="flex flex-col gap-4 ml-12 w-full ">
            {tags.map((tag, index) => (
              <TagInput
                id={index}
                key={index}
                tagValue={tag}
                tags={tags}
                setTags={setTags}
              />
            ))}
            <TagInput
              id={tags.length}
              key={tags.length}
              tagValue={""}
              tags={tags}
              setTags={setTags}
            />
          </div>
        </div>
        {/*<div className="form-control w-full max-w-xs flex items-center">*/}
        {/*  <label className="label">*/}
        {/*    <span className="label-text">Avatar</span>*/}
        {/*  </label>*/}
        {/*  <div className="indicator w-52 lg:w-max">*/}
        {/*    <span className="indicator-item indicator-center indicator-middle badge badge-primary">*/}
        {/*      Upload avatar +*/}
        {/*    </span>*/}
        {/*    <img*/}
        {/*      className="aspect-auto "*/}
        {/*      src="https://placeimg.com/300/150/arch"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <h2 className="text-center text-xl w-full mt-4">Change your avatar!</h2>
        <div className="flex justify-center w-full mt-3 md:w-3/5 lg:3/5">
          <Avatar photo={photo} setPhoto={setPhoto} />
          {console.log(photos)}
        </div>
        <div className=""></div>
        <div className="card-actions justify-center items-center">
          <button className="btn btn-primary mt-4" onClick={onSubmitHandler}>
            Confirm changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
