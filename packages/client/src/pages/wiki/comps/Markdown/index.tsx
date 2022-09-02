/*
 * @Author: wangxian
 * @Date: 2022-08-29 15:50:35
 * @LastEditTime: 2022-09-02 17:07:21
 */

import { FormOutlined } from '@ant-design/icons';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import MarkNav from 'markdown-navbar';
import DocApi from '@/api/DocApi';
import AuthButton from '@/comps/common/AuthButton';
import 'markdown-navbar/dist/navbar.css';
import 'github-markdown-css';
import './index.less';
import AddOrEditDocContentModal from '../AddOrEditDocContent';

interface IDocMarkdownProps {
  id?: number;
  name?: string;
}
const DocMarkdown = (props: IDocMarkdownProps) => {
  const { id, name } = props;
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const [content, setContent] = React.useState<string>('');

  const getContent = React.useCallback(async () => {
    if (id) {
      const res = await DocApi.getDocContent(id);
      if (res.successed) {
        setContent(res.data?.content);
      }
    }
  }, [id]);

  React.useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <>
      <div className="flex">
        <div className="text-gray-400 flex-1">
          {name}
          {name && (
            <AuthButton
              type="link"
              icon={<FormOutlined />}
              onClick={() => {
                if (id) {
                  setIsModal(true);
                }
              }}
            />
          )}
        </div>
      </div>
      <div className="flex" style={{ height: 'calc(100% - 40px)' }}>
        <div className="flex-1 p-6 markdown-body overflow-y-auto react-mark-down">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>
        <div className="h-full " style={{ width: '250px' }}>
          <MarkNav className="h-full w-full" source={content} ordered={false} />
        </div>
      </div>

      <AddOrEditDocContentModal
        isModal={isModal}
        content={content}
        docId={id}
        onCancel={() => {
          setIsModal(false);
        }}
        onSuccess={() => {
          getContent();
          setIsModal(false);
        }}
      />
    </>
  );
};

export default DocMarkdown;
