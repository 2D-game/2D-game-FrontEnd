import { SystemStyleObject } from '@mui/system';

const styles: Record<string, SystemStyleObject> = {
    createLobbyModalContainer: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    }
}

export default styles;