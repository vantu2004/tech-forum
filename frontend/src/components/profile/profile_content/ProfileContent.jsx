import CoverPhoto from "./CoverPhoto";
import Experience from "./Experience";
import About from "./About";
import Activity from "./Activity";
import Action from "./Action";
import Skill from "./Skill";

const ProfileContent = ({
  onOpenInfomationModal,
  onOpenMessageModal,
  onOpenAboutModal,
  onOpenSkillModal,
  onOpenExperienceModal,
}) => {
  return (
    <div>
      <CoverPhoto onOpenInfomationModal={onOpenInfomationModal} />
      <Action onOpenMessageModal={onOpenMessageModal} />
      <About onOpenAboutModal={onOpenAboutModal} />
      <Skill onOpenSkillModal={onOpenSkillModal} />
      <Experience onOpenExperienceModal={onOpenExperienceModal} />
      <Activity />
    </div>
  );
};

export default ProfileContent;
