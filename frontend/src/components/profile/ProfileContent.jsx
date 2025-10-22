import CoverPhoto from "./CoverPhoto";
import Experience from "./Experience";
import About from "./About";
import Activity from "./Activity";
import Action from "./Action";
import Skill from "./Skill";

const ProfileContent = ({
  onOpenInfomationModal,
  onOpenAboutModal,
  onOpenSkillModal,
  onOpenExperienceModal,
  onOpenPostedModal,
  id,
}) => {
  return (
    <div>
      <CoverPhoto onOpenInfomationModal={onOpenInfomationModal} />
      <About onOpenAboutModal={onOpenAboutModal} />
      <Skill onOpenSkillModal={onOpenSkillModal} />
      <Experience onOpenExperienceModal={onOpenExperienceModal} />
      <Activity id={id} onOpenPostedModal={onOpenPostedModal} />
    </div>
  );
};

export default ProfileContent;
