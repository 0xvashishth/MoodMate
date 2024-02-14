import React from "react";
import { gifObj } from "../utils/Dummy";
import { useAppContext } from "../Context/appContext";

const Privacy = ({ gif, sender, msg }) => {
  const { setPrivacy } = useAppContext();
  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Usage Policy
                  </h3>
                  <div class="mt-2 text-justify">
                    <p class="text-sm text-gray-500 h-48 overflow-scroll">
                      <span className="font-bold">
                        MoodMate Chat - Usage Policy<br></br> Welcome to
                        MoodMate
                      </span>
                      , an anonymous chat platform where users can communicate
                      based on their mood. Before using MoodMate, please
                      carefully read and understand the following usage policy.
                      By accessing and using MoodMate, you acknowledge that you
                      have read, understood, and agree to be bound by this
                      policy. If you do not agree with any part of this policy,
                      please refrain from using MoodMate.<br></br> 1.
                      <span className="font-bold">
                        {" "}
                        Anonymous Communication
                      </span>
                      : - MoodMate provides an anonymous communication platform
                      where users can interact without revealing their
                      identities. - Users are prohibited from attempting to
                      uncover or disclose the personal information of others.
                      Respect the privacy and anonymity of fellow users.
                      <br></br>
                      <span className="font-bold"> 2. Mood Rooms</span>: - Users
                      can join unique rooms based on their mood, where they can
                      have one-on-one conversations with another user who shares
                      a similar emotional state. - Users should be respectful
                      and considerate towards the other person in the room,
                      promoting a positive and supportive environment.<br></br>{" "}
                      <span className="font-bold">
                        3. Active Users in a Room
                      </span>
                      : - Users can see the list of active users within a
                      specific room. - Respect the privacy and anonymity of the
                      other user in the room. Do not attempt to uncover or
                      disclose their personal information.
                      <br></br>
                      <span className="font-bold">
                        4. Messaging and Real-Time Communication
                      </span>
                      : - Users can send and receive messages in real-time
                      within the rooms they join. - Maintain appropriate and
                      respectful communication with the other user. Do not
                      engage in harassment, bullying, hate speech, or any form
                      of offensive behavior.
                      <br></br>
                      <span className="font-bold">
                        5. Risk and Responsibility
                      </span>
                      : - Users understand and acknowledge that the use of
                      MoodMate is at their own risk. - MoodMate does not verify
                      the identity or intentions of its users and cannot
                      guarantee the accuracy, reliability, or quality of the
                      interactions that take place. - Users are solely
                      responsible for their actions and behavior within
                      MoodMate.<br></br>
                      <span className="font-bold"> 6. Dispute Resolution</span>:
                      - In the event of any disputes or conflicts that may arise
                      during a conversation, users are responsible for resolving
                      the issue. - Developers of MoodMate are not responsible
                      for any disputes that may occur between users. - If a
                      dispute arises, users are encouraged to immediately leave
                      the room and discontinue the conversation.<br></br>{" "}
                      <span className="font-bold">
                        7. Server and Application Errors
                      </span>
                      : - In the event of server or application errors, users
                      are encouraged to report the issue to MoodMate. - However,
                      MoodMate does not accept responsibility for any losses or
                      damages resulting from such errors.<br></br>
                      <span className="font-bold">
                        {" "}
                        8. Prohibited Activities
                      </span>
                      : - The following activities are strictly prohibited on
                      MoodMate: - Sharing personal information or attempting to
                      discover the identity of the other user. - Engaging in
                      illegal activities, including but not limited to
                      harassment, defamation, hate speech, or any form of
                      discriminatory behavior. - Uploading or sharing
                      inappropriate, offensive, or explicit content. -
                      Interfering with the proper functioning of MoodMate,
                      including hacking, phishing, or any unauthorized access or
                      use of the platform.<br></br>{" "}
                      <span className="font-bold">
                        9. Termination of Service
                      </span>
                      : - MoodMate reserves the right to terminate or suspend
                      the service at any time, without prior notice or
                      liability. - MoodMate may also suspend or ban users who
                      violate this usage policy or engage in any activities that
                      may harm the platform or its users. Please note that this
                      usage policy is subject to change at any time. It is your
                      responsibility to review and comply with the most
                      up-to-date version of the policy when using MoodMate. If
                      you have any questions or concerns regarding this usage
                      policy, please contact us through the provided channels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setPrivacy(false)}
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
