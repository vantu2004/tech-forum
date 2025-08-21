import InformationModal from "../../components/modal/InfomationModal.jsx";
import RightSideBar from "../../components/profile/RightSideBar.jsx";
import ProfilePageContent from "../../components/profile/profile_content/ProfileContent.jsx";
import { useState } from "react";
import AboutModal from "../../components/modal/AboutModel.jsx";
import SkillModal from "../../components/modal/SkillModal.jsx";
import ExperienceModal from "../../components/modal/ExperienceModal.jsx";
import MessageModal from "../../components/modal/MessageModel.jsx";

const ProfilePage = () => {
  const [openInfomationModal, setOpenInfomationModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openSkillModal, setOpenSkillModal] = useState(false);
  const [openExperienceModal, setOpenExperienceModal] = useState(false);

  const handleOpenInfomationModal = () => {
    setOpenInfomationModal(!openInfomationModal);
  };

  const handleOpenAboutModal = () => {
    setOpenAboutModal(!openAboutModal);
  };

  const handleOpenSkillModal = () => {
    setOpenSkillModal(!openSkillModal);
  };

  const handleOpenExperienceModal = () => {
    setOpenExperienceModal(!openExperienceModal);
  };

  const handleOpenMessageModal = () => {
    setOpenMessageModal(!openMessageModal);
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 sm:px-6 lg:px-6 flex gap-6 mt-20 mb-6 text-black">
      <div className="flex-1">
        <ProfilePageContent
          onOpenInfomationModal={handleOpenInfomationModal}
          onOpenMessageModal={handleOpenMessageModal}
          onOpenAboutModal={handleOpenAboutModal}
          onOpenSkillModal={handleOpenSkillModal}
          onOpenExperienceModal={handleOpenExperienceModal}
        />
      </div>
      <div className="hidden lg:block w-1/4">
        <RightSideBar />
      </div>

      {/* modal ko nên đặt trong component */}
      {openInfomationModal && (
        <InformationModal onClose={handleOpenInfomationModal} />
      )}

      {openAboutModal && <AboutModal onClose={handleOpenAboutModal} />}

      {openSkillModal && <SkillModal onClose={handleOpenSkillModal} />}

      {openExperienceModal && (
        <ExperienceModal onClose={handleOpenExperienceModal} />
      )}

      {openMessageModal && <MessageModal onClose={handleOpenMessageModal} />}
    </div>
  );
};

export default ProfilePage;
