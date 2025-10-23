import CoverPhoto from "./CoverPhoto";
import Experience from "./Experience";
import About from "./About";
import Activity from "./Activity";
import Action from "./Action";
import Skill from "./Skill";

const ProfileContent = ({
  id,
  onOpenPostedModal,
  onOpenCvModel,
  onOpenMessageModal,
}) => {
  return (
    <div>
      <CoverPhoto />
      <Action
        onOpenCvModel={onOpenCvModel}
        onOpenMessageModal={onOpenMessageModal}
      />
      <About />
      <Skill />
      <Experience />
      <Activity id={id} onOpenPostedModal={onOpenPostedModal} />
    </div>
  );
};

export default ProfileContent;
