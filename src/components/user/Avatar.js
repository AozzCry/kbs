import { useEffect } from "react";

const Avatar = ({ setPhoto }) => {
  useEffect(() => {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", () => {
        inputElement.click();
      });

      inputElement.addEventListener("change", () => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, () => {
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  }, []);

  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    setPhoto(file);
    console.log(URL.createObjectURL(file));
    if (file.type.startsWith("image/")) {
      thumbnailElement.style.backgroundImage = `url('${URL.createObjectURL(
        file
      )}')`;
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }

  return (
    <>
      <div className="drop-zone">
        <span className="drop-zone__prompt">
          Drop file here or click to upload
        </span>
        <input
          type="file"
          name="myFile"
          className="drop-zone__input"
          accept={"*/image"}
        />
      </div>
    </>
  );
};

export default Avatar;
