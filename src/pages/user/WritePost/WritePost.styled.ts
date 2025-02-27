import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  height: 100%;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  background-color:#f2f2f2;
`;

export const AdminNotice = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const FormFieldGroup = styled.div`
  display: flex;
  margin-bottom: 40px;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  min-width: 60px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

export const SelectCategory = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

export const WarningText = styled.div`
  color: #E25151;
  margin-bottom: 20px;
  font-size: 12px;
`;

export const TextareaField = styled.textarea`
  width: 100%;
  min-height: 600px;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
  resize: none;
  overflow: hidden;
  word-wrap: break-word;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
