import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uid } from "uid";

export default function useImage() {
  const url = ref("");

  const storage = useFirebaseStorage();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const filename = uid() + ".jpg";
    const sRef = storageRef(storage, "/products/" + filename);
    const uploadTask = uploadBytesResumable(sRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      () => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url.value = downloadURL;
        });
      }
    );
  };

  const imageIsUploaded = computed(() => {
    return url.value;
  });

  return { url, imageIsUploaded, onFileChange };
}
