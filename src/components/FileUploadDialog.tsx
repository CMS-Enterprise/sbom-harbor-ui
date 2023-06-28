/**
 * Component that renders a dialog for uploading SBOM JSON files.
 * @module sbom-harbor-ui/components/FileUploadDialog
 */
import React, { Dispatch, useCallback, useMemo, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import Button from '@mui/material/Button'
import { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MultiDropZone, {
  UploadedFile,
} from '@/components/MultiDropzone/MultiDropzone'

enum CloseReason {
  BACKDROP_CLICK = 'backdropClick',
  ESCAPE_KEY_DOWN = 'escapeKeyDown',
}

export type OnCloseReason = 'backdropClick' | 'escapeKeyDown' | undefined

export type OnCloseEvent =
  | React.BaseSyntheticEvent<Event, EventTarget, EventTarget>
  | unknown

export interface FileUploadDialogProps extends DialogProps {
  open: boolean
  onClose: (event: OnCloseEvent, reason?: OnCloseReason) => void
  uploadedFiles?: UploadedFile[]
  onUploadedFilesChange?: (files: UploadedFile[]) => void
  uploading?: boolean
  onUploadingChange?: (uploading: boolean) => void
}

type State = {
  uploading?: boolean
  uploadedFiles?: UploadedFile[]
}

enum ActionType {
  ADD_FILE_TO_UPLOAD = 'ADD_FILE_TO_UPLOAD',
  SET_UPLOADING = 'SET_UPLOADING',
  SET_UPLOADED_FILES = 'SET_UPLOADED_FILES',
  CANCEL_UPLOAD = 'CANCEL_UPLOAD',
  UPLOAD_SUCCESS = 'UPLOAD_SUCCESS',
}

type Action = {
  type: ActionType
  payload: State
}

const DEFAULT_STATE = {
  uploading: false,
  uploadedFiles: [],
} as State

/**
 * Component that renders a Material UI dialog for uploading SBOM JSON files.
 * @param {FileUploadDialogProps} props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {(event: OnCloseEvent, reason?: OnCloseReason) => void} props.onClose - Callback
 *   to handle the close event.
 * @param {UploadedFile[]} props.uploadedFiles - The list of files that've been uploaded
 * @param {(files: UploadedFile[]) => void} props.onUploadedFilesChange - Callback
 *  to handle changes to the list of uploaded files for controlled components.
 * @param {boolean} props.uploading - Whether or not a file is currently uploading
 * @param {(uploading: boolean) => void} props.onUploadingChange - Callback
 *  to handle changes to the uploading state for controlled components.
 * @param {...DialogProps} props - Rest of props to pass to the Dialog component
 * @returns {React.FC<FileUploadDialogProps>} - The FileUploadDialog component
 */
const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  open,
  onClose,
  uploadedFiles: controlledUploadedFiles,
  onUploadedFilesChange,
  uploading: controlledUploading,
  onUploadingChange,
  ...dialogProps
}) => {
  // Get the handleSubmit and reset functions from react-hook-form
  const { handleSubmit, reset } = useForm()

  // Determine if the component is controlled
  const isControlled = controlledUploadedFiles !== undefined // <- Determine if the component is controlled

  /**
   * Callback to call the update functions for the controlled props.
   * @param {boolean} uploading - Whether or not a file is currently uploading
   * @param {UploadedFile[]} uploadedFiles - List of files that've been uploaded
   */
  const updateControls = useCallback(
    (uploading: boolean, uploadedFiles: UploadedFile[]) => {
      if (!isControlled) return
      if (onUploadingChange) onUploadingChange(uploading)
      if (onUploadedFilesChange) onUploadedFilesChange(uploadedFiles)
    },
    []
  )

  /**
   * The reducer function for the FileUploadDialog component.
   * @param {State} state - The current state
   * @param {Action} action - The action to perform
   * @returns {State} - The new state
   */
  const [state, dispatch]: [State, Dispatch<Action>] = useReducer(
    (
      state: State,
      {
        type,
        payload: {
          uploading: actionUploading = false,
          uploadedFiles: actionUploadedFiles = [],
        },
      }: Action
    ): State => {
      const { uploadedFiles: stateUploadedFiles = [] } = state
      switch (type) {
        case 'ADD_FILE_TO_UPLOAD':
          // If the component is controlled, don't modify state, call onUploadedFilesChange
          if (isControlled && onUploadedFilesChange) {
            onUploadedFilesChange([
              ...stateUploadedFiles,
              ...actionUploadedFiles,
            ])
            return state
          }
          return {
            ...state,
            uploadedFiles: [...stateUploadedFiles, ...actionUploadedFiles],
          }
        case 'SET_UPLOADING':
          if (isControlled && onUploadingChange) {
            onUploadingChange(actionUploading)
            return state
          }
          return {
            ...state,
            uploading: actionUploading,
          }
        case 'SET_UPLOADED_FILES':
          // If the component is controlled, don't modify state, call onUploadedFilesChange
          if (isControlled && onUploadedFilesChange) {
            onUploadedFilesChange([
              ...stateUploadedFiles,
              ...actionUploadedFiles,
            ])
            return state
          }
          return {
            ...state,
            uploadedFiles: actionUploadedFiles,
          }
        case 'UPLOAD_SUCCESS':
          // If the component is controlled, don't modify state, call onUploadedFilesChange
          if (isControlled) {
            updateControls(false, actionUploadedFiles)
            return state
          }
          return {
            ...state,
            uploadedFiles: actionUploadedFiles,
          }
        case 'CANCEL_UPLOAD':
          // If the component is controlled, don't modify state, call onUploadedFilesChange
          if (isControlled) {
            updateControls(false, [])
            return state
          }
          return {
            ...state,
            uploadedFiles: [],
          }
        default:
          throw new Error(`Unhandled action type: ${type}`)
      }
    },
    DEFAULT_STATE
  )

  // Use a new prop or internal state depending on if the component is controlled
  const uploadedFiles = useMemo(
    () => (isControlled ? controlledUploadedFiles : state.uploadedFiles) || [],
    [controlledUploadedFiles, isControlled, state.uploadedFiles]
  )

  // Use a new prop or internal state depending on if the component is controlled
  const uploading = useMemo(
    () => (isControlled ? controlledUploading : state.uploading),
    [controlledUploading, isControlled, state.uploading]
  )

  /**
   * Handles the onClose event from the Dialog component.
   * @param {React.BaseSyntheticEvent} event - The event that triggered the close
   * @param {'backdropClick' | 'escapeKeyDown'} reason - The reason for the close
   */
  const handleClose = useCallback(
    (event: OnCloseEvent, reason?: OnCloseReason) => {
      // return early to prevent closing if the user clicked on the backdrop
      if (reason === CloseReason.BACKDROP_CLICK) return
      // return early if the user is currently uploading files
      if (state.uploading) return
      // otherwise, reset the form and close the dialog
      reset()
      // setUploadedFiles([])
      // setUploading(false)
      dispatch({
        type: ActionType.CANCEL_UPLOAD,
        payload: {
          uploading: false,
          uploadedFiles: [],
        },
      })
      onClose(event, reason)
    },
    [state.uploading]
  )

  /**
   * Handles the onSubmit event from the form.
   * @param {Object} data - The form data to submit
   * @param {React.BaseSyntheticEvent} event - The event that triggered the submit
   * @todo implement uploading of files
   */
  const onSubmit = useCallback(
    (data: unknown, event?: React.BaseSyntheticEvent) => {
      event?.preventDefault()
      dispatch({
        type: ActionType.SET_UPLOADING,
        payload: { uploading: true },
      })
      // TODO: actually upload files (this is just a mock)
      setTimeout(() => {
        dispatch({
          type: ActionType.UPLOAD_SUCCESS,
          payload: {
            ...state,
            uploadedFiles: uploadedFiles.map((f) => ({
              ...f,
              progress: 100,
              uploaded: true,
            })),
            uploading: false,
          },
        })
      }, 2000)
    },
    [state, uploadedFiles]
  )

  /**
   * Removes a file from the list of uploaded files.
   * @param {string} id - The id of the file to remove
   */
  const handleRemoveFile = useCallback(
    (id: string) => {
      dispatch({
        type: ActionType.SET_UPLOADED_FILES,
        payload: {
          ...state,
          uploadedFiles: uploadedFiles.filter((f) => f.id !== id),
        },
      })
    },
    [state, uploadedFiles]
  )

  /**
   * Handles the onFileSelect callback from the MultiDropzone component.
   * @param {File[]} newFiles - The list of files to upload
   */
  const handleFileSelect = useCallback(
    (newFiles: File[]) => {
      dispatch({
        type: ActionType.ADD_FILE_TO_UPLOAD,
        payload: {
          ...state,
          uploadedFiles: [
            ...uploadedFiles,
            ...newFiles.map((f) => {
              const fileWithProgress = {
                ...f,
                name: f.name,
                progress: 0,
                id: uuidv4(),
              } as UploadedFile
              fileWithProgress.progress = 0
              return fileWithProgress
            }),
          ],
        },
      })
    },
    [state, uploadedFiles]
  )

  /**
   * Handles the onDragOver event from the Dialog component.
   * @param {React.DragEvent} event - The drag event
   */
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return (
    <>
      <DialogTitle variant="h5">Upload SBOM JSON files</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MultiDropZone
            uploading={uploading || false}
            multiple={false}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            uploadedFiles={uploadedFiles}
            maxFiles={1}
            textOverrides={{
              supportsText: 'Supports CycloneDX JSON files',
            }}
          />
          <DialogActions>
            <Button onClick={handleClose} disabled={uploading} size="large">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={uploading}
            >
              Upload
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  )
}

export default FileUploadDialog
