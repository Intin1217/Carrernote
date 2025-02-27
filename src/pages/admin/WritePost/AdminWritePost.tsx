import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from '@pages/user/WritePost/WritePost.styled'
import Button from '@components/Button/Button';
import { NavbarContainer } from 'components';
import { useUserStore } from '@stores/userStore';
import apiUtils from '@utils/apiUtils';
import { NOTICE_API } from '@routes/apiRoutes';
import { ErrorToast, SuccessToast } from '@utils/ToastUtils';
import { ROUTE_LINK } from '@routes/routes';
const { ALL_NOTICES, DETAILS_BOARD } = NOTICE_API;
const AdminWritePost = () => {

  const ADMIN_MAIN = ROUTE_LINK.ADMIN_MAIN.link;
  const user = useUserStore((state) => state.user);
  const userId = user?.user_id;
  const { state } = useLocation(); // PostCard로 부터 state 값 전달 받기
  const postId = state?.postId;
  const isEdit = !!state; // state 가 존재하면 수정모드, 빈 값이면 작성모드
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');
  const [inputFieldChecked, setInputFieldChecked] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (title.length > 0 && content.length > 0) {
      setInputFieldChecked(false);
    } else {
      setInputFieldChecked(true);
    }
  }, [title, content]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    // 공통 데이터 준비
    const data = isEdit
      ? { title, content } // 수정 요청
      : { title, content, user: userId }; // 생성 요청

    try {
      // 서버 요청
      const response = await apiUtils({
        url: isEdit ? DETAILS_BOARD(postId) : ALL_NOTICES,
        method: isEdit ? 'PUT' : 'POST',
        data,
      });

      console.log('서버 응답:', response);


      // 성공 처리
      if (isEdit) {
        SuccessToast('게시물이 수정되었습니다.');
        navigate(`/admin/post/${postId}`, { state: { updated: true } }); // 수정된 상태 전달
      } else {
        SuccessToast('게시물이 저장되었습니다.');
        navigate(ADMIN_MAIN);
      }

    } catch (error) {
      // 에러 처리
      console.error('게시글 등록 혹은 수정 실패:', error);
      ErrorToast(
        isEdit
          ? '게시물 수정 중 오류가 발생했습니다.'
          : '게시물 등록 중 오류가 발생했습니다.'
      );
    }
  };


  return (
    <NavbarContainer>
      <Styled.Container>
        <Styled.AdminNotice>공지</Styled.AdminNotice>
        <Styled.FormFieldGroup>
          <Styled.Label>제목</Styled.Label>
          <Styled.InputField
            type="text"
            placeholder="제목을 입력해 주세요."
            value={title}
            name={title}
            onChange={handleTitleChange}
          />
        </Styled.FormFieldGroup>
        <Styled.Label>내용</Styled.Label>
        <Styled.TextareaField
          placeholder="내용을 입력하세요."
          value={content}
          name={content}
          onChange={handleContentChange}
        />
        <Styled.ButtonGroup>
          <Button
            border="1px solid #79B0CB"
            useHover={true}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#fdfdfd"
            textColor="#79B0CB"
            width="10%"
            onClick={() => navigate(ADMIN_MAIN)}>
            취소
          </Button>
          <Button
            disabled={inputFieldChecked}
            useHover={!inputFieldChecked}
            useTransition={true}
            transitionDuration={0.3}
            hoverBackgroundColor="#3F82AC"
            backgroundColor={inputFieldChecked ? 'gray' : '#79B0CB'}
            border="none"
            textColor="white"
            width="10%"
            onClick={handleSubmit}>
            완료
          </Button>
        </Styled.ButtonGroup>
      </Styled.Container>
    </NavbarContainer>
  );
};

export default AdminWritePost;
