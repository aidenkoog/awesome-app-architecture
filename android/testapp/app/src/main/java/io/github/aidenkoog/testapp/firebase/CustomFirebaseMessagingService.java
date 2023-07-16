package io.github.aidenkoog.testapp.firebase;

/* this class is not completed yet. */
class CustomFirebaseMessagingService {

    FcmRunnableImpl runnableImpl = new FcmRunnableImpl();

    public void test(Object remoteMessage) {
        //TODO:
    }

    private synchronized void dispatchPushEvent(Object remoteMessage) {
        try {
            test(remoteMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    class FcmRunnableImpl implements Runnable {

        private Object remoteMessage;

        public FcmRunnableImpl addMessage(Object remoteMessage) {
            this.remoteMessage = remoteMessage;
            return this;
        }

        @Override
        public void run() {
            dispatchPushEvent(this.remoteMessage);
        }
    }

    public void received(Object message) {
        new Thread(runnableImpl.addMessage(message)).start();
    }
}