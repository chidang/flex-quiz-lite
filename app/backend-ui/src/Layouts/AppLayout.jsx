import { ConfigProvider, Layout, message } from 'antd';
import { __ } from '../util/common'
import GlobalData from '../util/globalData'
import { NotificationProvider } from '../hooks/useNotification';
import { AppProvider } from '../context/AppContext'
import { LicenseProvider } from '../context/LicenseContext';
import ErrorBoundary from '../context/ErrorBoundary';

const zIndexPopup = 999991;

message.config({
  top: 50,
  duration: 2,
  maxCount: 3,
});

const AppLayout = ({ PageContent }) => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <LicenseProvider>
          <ConfigProvider
            prefixCls="fxq-exam"
            theme={{
              token: {
                colorPrimary: GlobalData.colorPrimary,
                zIndexPopupBase: zIndexPopup
              },
              components: {
                Layout: {
                  bodyBg: GlobalData.bodyBg
                },
                Drawer: {
                  rootStyle: {
                    padding: 0
                  },
                  style: {
                    padding: 0
                  }
                },
              }
            }}
          >
            <div id="flex-quiz-wrap" className='fxq-pt-5 fxq-pr-5'>
              <NotificationProvider>
                <Layout className='fxq-rounded-md fxq-p-10'>
                  <PageContent />
                </Layout>
              </NotificationProvider>
            </div >
          </ConfigProvider >
        </LicenseProvider>
      </AppProvider>
    </ErrorBoundary>
  );
};
export default AppLayout;
