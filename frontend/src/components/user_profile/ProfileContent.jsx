import CoverPhoto from "./CoverPhoto";
import Experience from "./Experience";
import About from "./About";
import Activity from "./Activity";
import Action from "./Action";
import Skill from "./Skill";
import { useEffect } from "react";
import { useUserProfileStore } from "../../stores/useUserProfileStore";
import { useUserExperienceStore } from "../../stores/useUserExperienceStore";
import { usePostStore } from "../../stores/usePostStore";
import { useUserSkillStore } from "../../stores/useUserSkillStore";

const ProfileContent = ({ id }) => {
  const { fetchUserProfileByUserId } = useUserProfileStore();
  const { fetchUserExperiencesByUserId } = useUserExperienceStore();
  const { fetchUserSkillsByUserId } = useUserSkillStore();
  const { fetchPostsByUserId } = usePostStore();

  useEffect(() => {
    fetchUserProfileByUserId(id);
    fetchUserExperiencesByUserId(id);
    fetchUserSkillsByUserId(id);
    fetchPostsByUserId(id);
  }, [
    id,
    fetchUserProfileByUserId,
    fetchUserExperiencesByUserId,
    fetchUserSkillsByUserId,
    fetchPostsByUserId,
  ]);

  return (
    <div>
      <CoverPhoto />
      <Action />
      <About />
      <Skill />
      <Experience />
      <Activity id={id} />
    </div>
  );
};

export default ProfileContent;
